import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const WS_URL = 'ws://localhost:8080/ws';

const Sala = () => {
  const query = useQuery();
  const history = useHistory();
  const ws = useRef(null);
  const isTransitioning = useRef(false);
  const [gameState, setGameState] = useState(null);
  const [connected, setConnected] = useState(false);
  const [myReady, setMyReady] = useState(false);

  const roomId = query.get('room_id');
  const ownerId = query.get('owner_id');
  const isHost = query.get('host') === 'true';
  const salaNome = query.get('sala') || 'Lobby';
  const username = localStorage.getItem('username') || 'Guest';

  useEffect(() => {
    if (!roomId || !username) {
      history.push('/play-options');
      return;
    }

    const wsUrl = `${WS_URL}?room_id=${roomId}&username=${encodeURIComponent(username)}${isHost ? `&owner_id=${ownerId}` : ''}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('Connected to WebSocket');
      setConnected(true);
    };

    ws.current.onmessage = (event) => {
      try {
        const messages = event.data.split('\n').filter(m => m.trim());

        messages.forEach(msgStr => {
          try {
            const message = JSON.parse(msgStr);
            console.log('Received message:', message);

            if (message.type === 'update') {
              setGameState(message.gameState);
            } else if (message.type === 'lobby_closed') {
              alert(message.message);
              history.push('/play-options');
            } else if (message.type === 'game_started') {
              console.log('Game started! Redirecting to game...');
              isTransitioning.current = true;
              setTimeout(() => {
                const gameUrl = `/game?room_id=${roomId}${isHost ? `&owner_id=${ownerId}` : ''}&host=${isHost}`;
                history.push(gameUrl);
              }, 100);
            }
          } catch (parseError) {
            console.error('Error parsing individual message:', parseError, msgStr);
          }
        });
      } catch (error) {
        console.error('Error processing WebSocket message:', error, event.data);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = () => {
      console.log('Disconnected from WebSocket');
      setConnected(false);
    };

    return () => {
      if (ws.current && !isTransitioning.current) {
        ws.current.close();
      }
    };
  }, [roomId, username, isHost, ownerId, history]);

  const toggleReady = () => {
    if (!gameState || !ws.current) return;

    const myId = Object.keys(gameState.players).find(
      id => gameState.players[id].username === username
    );

    if (myId) {
      const newReady = !myReady;
      setMyReady(newReady);
      ws.current.send(JSON.stringify({
        type: 'player_ready',
        player_id: myId,
        ready: newReady
      }));
    }
  };

  const startGame = () => {
    if (!gameState || !ws.current || !isHost) return;

    const myId = Object.keys(gameState.players).find(
      id => gameState.players[id].username === username
    );

    if (myId) {
      ws.current.send(JSON.stringify({
        type: 'start_game',
        player_id: myId
      }));
    }
  };

  if (!connected || !gameState) {
    return (
      <div className="landing-container">
        <div className="content-box" style={{maxWidth:'500px', margin:'auto', textAlign:'center'}}>
          <h2 style={{color:'#fff'}}>Connecting to lobby...</h2>
        </div>
      </div>
    );
  }

  const players = Object.values(gameState.players);
  const allReady = players.length >= 3 && players.every(p => p.is_ready);
  const canStart = isHost && allReady;

  return (
    <div className="landing-container">
      <div className="content-box" style={{maxWidth:'600px', margin:'auto'}}>
        <h1 className="title" style={{fontSize: '1.5rem', marginBottom: '1.5rem'}}>{salaNome}</h1>

        <div style={{
          background: 'rgba(255, 180, 0, 0.2)',
          border: '1px solid rgba(255, 180, 0, 0.5)',
          borderRadius: '8px',
          padding: '0.8rem',
          marginBottom: '1rem',
          color: '#ffb400'
        }}>
          Waiting for players to ready up... (min 3 players)
        </div>

        <h2 style={{color:'#fff', fontSize:'1.3rem', marginBottom:'1rem'}}>
          Players in Lobby ({players.length}/6)
        </h2>

        <ul style={{listStyle:'none', padding:0, marginBottom:'2rem'}}>
          {players.map((player) => (
            <li key={player.id} style={{
              marginBottom:'0.5rem',
              padding:'0.8rem 1rem',
              border:'1px solid #ddd',
              borderRadius:'8px',
              background: player.is_ready ? 'rgba(0,255,0,0.1)' : 'rgba(255,255,255,0.07)',
              color:'#fff',
              fontSize: '1.1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{fontWeight: player.is_owner ? 'bold' : 'normal'}}>
                  {player.username}
                  {player.is_owner && ' 👑'}
                </span>
                <div style={{
                  display: 'inline-block',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: player.color,
                  marginLeft: '8px'
                }}></div>
              </div>
              <span style={{
                fontSize: '0.9rem',
                color: player.is_ready ? '#0f0' : '#888',
                fontWeight: 'bold'
              }}>
                {player.is_ready ? '✓ Ready' : 'Not Ready'}
              </span>
            </li>
          ))}

          {[...Array(6 - players.length)].map((_, idx) => (
            <li key={`empty-${idx}`} style={{
              marginBottom:'0.5rem',
              padding:'0.8rem 1rem',
              border:'1px dashed #888',
              borderRadius:'8px',
              background:'rgba(255,255,255,0.03)',
              color:'#888',
              fontSize: '1.1rem'
            }}>
              Empty slot
            </li>
          ))}
        </ul>

        <button
          className="game-button"
          onClick={toggleReady}
          style={{
            width:'100%',
            fontSize: '1.1rem',
            marginBottom: '0.5rem',
            background: myReady ? '#2ecc71' : '#3498db'
          }}
        >
          {myReady ? 'Unready' : 'Ready'}
        </button>

        {isHost && (
          <button
            className="game-button"
            onClick={startGame}
            disabled={!canStart}
            style={{
              width:'100%',
              opacity: canStart ? 1 : 0.5,
              fontSize: '1.1rem',
              marginBottom: '0.5rem'
            }}
          >
            {canStart ? 'Start Game' : `Waiting... (${players.filter(p => p.is_ready).length}/${players.length} ready)`}
          </button>
        )}

        <button
          className="game-button"
          style={{marginTop:'1rem', width:'100%', fontSize: '1.1rem'}}
          onClick={() => history.push('/play-options')}
        >
          Leave Lobby
        </button>
      </div>
    </div>
  );
};

export default Sala;