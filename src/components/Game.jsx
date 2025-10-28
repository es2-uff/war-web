import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const WS_URL = 'ws://localhost:8080/ws';

const Game = () => {
  const query = useQuery();
  const history = useHistory();
  const ws = useRef(null);
  const [gameState, setGameState] = useState(null);
  const [connected, setConnected] = useState(false);

  const roomId = query.get('room_id');
  const ownerId = query.get('owner_id');
  const isHost = query.get('host') === 'true';
  const username = localStorage.getItem('username') || 'Guest';

  useEffect(() => {
    if (!roomId || !username) {
      history.push('/play-options');
      return;
    }

    const wsUrl = `${WS_URL}?room_id=${roomId}&username=${encodeURIComponent(username)}${isHost ? `&owner_id=${ownerId}` : ''}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('Connected to Game WebSocket');
      setConnected(true);
    };

    ws.current.onmessage = (event) => {
      try {
        const messages = event.data.split('\n').filter(m => m.trim());

        messages.forEach(msgStr => {
          try {
            const message = JSON.parse(msgStr);
            console.log('Game received message:', message);

            if (message.type === 'update') {
              setGameState(message.gameState);
            } else if (message.type === 'lobby_closed') {
              alert(message.message);
              history.push('/play-options');
            }
          } catch (parseError) {
            console.error('Error parsing message:', parseError);
          }
        });
      } catch (error) {
        console.error('Error processing message:', error);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = () => {
      console.log('Disconnected from Game WebSocket');
      setConnected(false);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [roomId, username, isHost, ownerId, history]);

  if (!connected || !gameState) {
    return (
      <div className="landing-container">
        <div className="content-box" style={{maxWidth:'600px', margin:'auto', textAlign:'center'}}>
          <h2 style={{color:'#fff'}}>Loading game...</h2>
        </div>
      </div>
    );
  }

  const players = Object.values(gameState.players);

  return (
    <div className="landing-container">
      <div className="content-box" style={{maxWidth:'900px', margin:'auto'}}>
        <h1 className="title" style={{fontSize: '2rem', marginBottom: '1.5rem'}}>WAR - Game</h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '10px',
            padding: '1.5rem'
          }}>
            <h2 style={{color:'#fff', fontSize:'1.3rem', marginBottom:'1rem'}}>
              Players ({players.length})
            </h2>
            <ul style={{listStyle:'none', padding:0}}>
              {players.map((player) => (
                <li key={player.id} style={{
                  marginBottom:'0.8rem',
                  padding:'0.8rem',
                  border:'1px solid #ddd',
                  borderRadius:'8px',
                  background: player.id === gameState.current_turn ? 'rgba(255,215,0,0.2)' : 'rgba(255,255,255,0.07)',
                  color:'#fff',
                  fontSize: '1rem'
                }}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <span style={{fontWeight: player.is_owner ? 'bold' : 'normal'}}>
                      {player.username}
                      {player.is_owner && ' 👑'}
                    </span>
                    <div style={{
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                      background: player.color
                    }}></div>
                  </div>
                  <div style={{fontSize:'0.9rem', color:'#aaa', marginTop:'0.3rem'}}>
                    Armies: {player.armies}
                  </div>
                </li>
              ))}
            </ul>

            <div style={{
              marginTop:'1.5rem',
              padding:'1rem',
              background:'rgba(255,180,0,0.2)',
              border:'1px solid rgba(255,180,0,0.5)',
              borderRadius:'8px'
            }}>
              <div style={{color:'#ffb400', fontWeight:'bold', marginBottom:'0.5rem'}}>
                Current Turn:
              </div>
              <div style={{color:'#fff'}}>
                {gameState.players[gameState.current_turn]?.username || 'Unknown'}
              </div>
            </div>

            <div style={{
              marginTop:'1rem',
              padding:'1rem',
              background:'rgba(0,150,255,0.2)',
              border:'1px solid rgba(0,150,255,0.5)',
              borderRadius:'8px'
            }}>
              <div style={{color:'#5dade2', fontWeight:'bold', marginBottom:'0.5rem'}}>
                Phase:
              </div>
              <div style={{color:'#fff', textTransform:'capitalize'}}>
                {gameState.phase}
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '10px',
            padding: '1.5rem'
          }}>
            <h2 style={{color:'#fff', fontSize:'1.3rem', marginBottom:'1rem'}}>
              Game Board
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem'
            }}>
              {Object.values(gameState.territories).map((territory) => (
                <div key={territory.id} style={{
                  padding:'1rem',
                  border:'2px solid #ddd',
                  borderRadius:'8px',
                  background: territory.owner ? `${gameState.players[territory.owner]?.color}33` : 'rgba(100,100,100,0.2)',
                  color:'#fff'
                }}>
                  <div style={{fontWeight:'bold', fontSize:'1.1rem', marginBottom:'0.5rem'}}>
                    {territory.name}
                  </div>
                  <div style={{fontSize:'0.9rem', color:'#aaa'}}>
                    Owner: {territory.owner ? gameState.players[territory.owner]?.username : 'Unclaimed'}
                  </div>
                  <div style={{fontSize:'0.9rem', color:'#aaa'}}>
                    Armies: {territory.armies}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop:'2rem',
              padding:'1rem',
              background:'rgba(255,255,255,0.08)',
              borderRadius:'8px',
              textAlign:'center',
              color:'#fff'
            }}>
              Game controls and actions will go here...
            </div>
          </div>
        </div>

        <button
          className="game-button"
          style={{width:'200px', margin:'0 auto', display:'block'}}
          onClick={() => {
            if (window.confirm('Are you sure you want to leave the game?')) {
              history.push('/play-options');
            }
          }}
        >
          Leave Game
        </button>
      </div>
    </div>
  );
};

export default Game;
