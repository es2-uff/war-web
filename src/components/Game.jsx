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
  const [selectedTerritory, setSelectedTerritory] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  const roomId = query.get('room_id');
  const ownerId = query.get('owner_id');
  const isHost = query.get('host') === 'true';
  const username = localStorage.getItem('username') || 'Guest';

  // Phase translations
  const phaseTranslations = {
    'waiting': 'aguardando',
    'deploy': 'distribuir tropas',
    'attack': 'atacar',
    'move': 'mover tropas',
    'fortify': 'fortificar'
  };

  const handleTerritoryClick = (territoryId) => {
    console.log('Territory clicked:', territoryId);
    setSelectedTerritory(territoryId);
  };

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
          <h2 style={{color:'#fff'}}>Carregando jogo...</h2>
        </div>
      </div>
    );
  }

  const players = Object.values(gameState.players);

  // Debug: Log gameState to see what's happening
  console.log('GameState:', gameState);
  console.log('Players:', players);

  // Territory coordinates with mock data (converted to percentages from 2000x2000 image)
  // In production, this would come from gameState.territories
  const playerIds = Object.keys(gameState.players);
  const numPlayers = playerIds.length;

  // Distribute territories evenly among all players
  const territories = [
    { id: 0, name: 'Roraima', x: 24.3, y: 24.4, owner: playerIds[0 % numPlayers], troops: 3 },
    { id: 1, name: 'Amapá', x: 32.7, y: 9.6, owner: playerIds[1 % numPlayers], troops: 5 },
    { id: 2, name: 'Amazonas', x: 9.1, y: 37.6, owner: playerIds[2 % numPlayers], troops: 2 },
    { id: 3, name: 'Pará', x: 28.1, y: 42.2, owner: playerIds[3 % numPlayers], troops: 4 },
    { id: 4, name: 'Tocantins', x: 53.5, y: 27.4, owner: playerIds[4 % numPlayers], troops: 7 },
    { id: 5, name: 'Maranhão', x: 56.1, y: 10.6, owner: playerIds[5 % numPlayers], troops: 3 },
    { id: 6, name: 'Goiás', x: 73.1, y: 27.2, owner: playerIds[6 % numPlayers], troops: 4 },
    { id: 7, name: 'Mato Grosso', x: 64.5, y: 40.2, owner: playerIds[7 % numPlayers], troops: 6 },
    { id: 8, name: 'Rondônia', x: 46.3, y: 47.0, owner: playerIds[8 % numPlayers], troops: 4 },
    { id: 9, name: 'Acre', x: 48.1, y: 65.0, owner: playerIds[9 % numPlayers], troops: 8 },
    { id: 10, name: 'Mato Grosso do Sul', x: 60.1, y: 55.4, owner: playerIds[10 % numPlayers], troops: 2 },
    { id: 11, name: 'São Paulo', x: 63.1, y: 70.2, owner: playerIds[11 % numPlayers], troops: 5 },
    { id: 12, name: 'Paraná', x: 56.1, y: 76.2, owner: playerIds[12 % numPlayers], troops: 3 },
    { id: 13, name: 'Santa Catarina', x: 59.7, y: 83.0, owner: playerIds[13 % numPlayers], troops: 3 },
    { id: 14, name: 'Rio Grande do Sul', x: 52.1, y: 88.6, owner: playerIds[14 % numPlayers], troops: 9 },
    { id: 15, name: 'Rio de Janeiro', x: 81.1, y: 73.8, owner: playerIds[15 % numPlayers], troops: 4 },
    { id: 16, name: 'Espírito Santo', x: 87.3, y: 65.8, owner: playerIds[16 % numPlayers], troops: 2 },
    { id: 17, name: 'Minas Gerais', x: 73.7, y: 62.8, owner: playerIds[17 % numPlayers], troops: 5 },
    { id: 18, name: 'Bahia', x: 79.9, y: 45.6, owner: playerIds[18 % numPlayers], troops: 6 },
    { id: 19, name: 'Sergipe', x: 94.1, y: 45.4, owner: playerIds[19 % numPlayers], troops: 3 },
    { id: 20, name: 'Alagoas', x: 97.3, y: 41.6, owner: playerIds[20 % numPlayers], troops: 5 },
    { id: 21, name: 'Pernambuco', x: 90.3, y: 35.8, owner: playerIds[21 % numPlayers], troops: 7 },
    { id: 22, name: 'Paraíba', x: 95.7, y: 33.2, owner: playerIds[22 % numPlayers], troops: 4 },
    { id: 23, name: 'Rio Grande do Norte', x: 94.7, y: 29.8, owner: playerIds[23 % numPlayers], troops: 2 },
    { id: 24, name: 'Ceará', x: 86.7, y: 27.4, owner: playerIds[24 % numPlayers], troops: 8 },
    { id: 25, name: 'Piauí', x: 78.9, y: 34.2, owner: playerIds[25 % numPlayers], troops: 4 },
  ];

  return (
    <div className="landing-container" style={{
      display: 'grid',
      gridTemplateColumns: '300px 1fr 300px',
      height: '100vh',
      gap: '0',
      padding: '0',
      overflow: 'hidden'
    }}>
      {/* Left Sidebar - Players */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(20,20,30,0.95) 0%, rgba(10,10,20,0.95) 100%)',
        padding: '1.5rem',
        overflowY: 'auto',
        borderRight: '2px solid rgba(100,150,255,0.3)',
        boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.3)',
        height: '100vh'
      }}>
        <h2 style={{color:'#fff', fontSize:'1.3rem', marginBottom:'1rem'}}>
          Jogadores ({players.length})
        </h2>
        <ul style={{listStyle:'none', padding:0}}>
          {players.map((player) => (
            <li key={player.id} style={{
              marginBottom:'0.8rem',
              padding:'1rem',
              border: player.id === gameState.current_turn ? '2px solid rgba(255,215,0,0.6)' : '1px solid rgba(255,255,255,0.15)',
              borderRadius:'12px',
              background: player.id === gameState.current_turn
                ? 'linear-gradient(135deg, rgba(255,215,0,0.25) 0%, rgba(255,180,0,0.15) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)',
              color:'#fff',
              fontSize: '1rem',
              boxShadow: player.id === gameState.current_turn
                ? '0 4px 12px rgba(255,215,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                : '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease'
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
            </li>
          ))}
        </ul>

        <div style={{
          marginTop:'1.5rem',
          padding:'1rem',
          background:'linear-gradient(135deg, rgba(255,180,0,0.3) 0%, rgba(255,140,0,0.2) 100%)',
          border:'2px solid rgba(255,180,0,0.6)',
          borderRadius:'12px',
          boxShadow: '0 4px 12px rgba(255,180,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)'
        }}>
          <div style={{color:'#ffd700', fontWeight:'bold', marginBottom:'0.5rem', fontSize:'0.9rem'}}>
            Turno Atual:
          </div>
          <div style={{color:'#fff', fontSize:'1.1rem', fontWeight:'600'}}>
            {gameState.players[gameState.current_turn]?.username || 'Desconhecido'}
          </div>
        </div>

        <div style={{
          marginTop:'1rem',
          padding:'1rem',
          background:'linear-gradient(135deg, rgba(0,150,255,0.3) 0%, rgba(0,100,200,0.2) 100%)',
          border:'2px solid rgba(0,150,255,0.6)',
          borderRadius:'12px',
          boxShadow: '0 4px 12px rgba(0,150,255,0.25), inset 0 1px 0 rgba(255,255,255,0.2)'
        }}>
          <div style={{color:'#5dade2', fontWeight:'bold', marginBottom:'0.5rem', fontSize:'0.9rem'}}>
            Fase:
          </div>
          <div style={{color:'#fff', textTransform:'capitalize', fontSize:'1.1rem', fontWeight:'600'}}>
            {phaseTranslations[gameState.phase] || gameState.phase}
          </div>
        </div>
      </div>

      {/* Center - Map */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        overflowY: 'auto'
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '100%'
        }}>
          <img
            src="/brasil.jpg"
            alt="World Map"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block'
            }}
          />

          {/* Territory buttons */}
          {territories.map((territory) => {
            const owner = territory.owner ? gameState.players[territory.owner] : null;
            const baseColor = owner ? owner.color : '#666666';
            const rgbaColor = baseColor.startsWith('#')
              ? `${baseColor}CC` // Add alpha to hex
              : baseColor.replace(')', ', 0.8)').replace('rgb', 'rgba');
            const hoverColor = owner ? owner.color : '#888888';
            const isSelected = selectedTerritory === territory.id;

            return (
              <div
                key={territory.id}
                style={{
                  position: 'absolute',
                  left: `${territory.x}%`,
                  top: `${territory.y}%`,
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  zIndex: 10
                }}
              >
                <button
                  onClick={() => handleTerritoryClick(territory.id)}
                  style={{
                    width: '35px',
                    height: '35px',
                    borderRadius: '50%',
                    border: isSelected ? '4px solid #FFD700' : '3px solid rgba(255, 255, 255, 0.9)',
                    background: rgbaColor,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                    boxShadow: isSelected ? '0 0 12px rgba(255, 215, 0, 0.8)' : '0 2px 4px rgba(0,0,0,0.3)',
                    transform: isSelected ? 'scale(1.1)' : 'scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = hoverColor;
                      e.currentTarget.style.transform = 'scale(1.15)';
                      e.currentTarget.style.border = '3px solid rgba(255, 255, 255, 1)';
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = rgbaColor;
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.border = '3px solid rgba(255, 255, 255, 0.9)';
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
                    }
                  }}
                >
                  {territory.troops}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Sidebar - Controls */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(20,20,30,0.95) 0%, rgba(10,10,20,0.95) 100%)',
        padding: '1rem',
        overflowY: 'auto',
        borderLeft: '2px solid rgba(100,150,255,0.3)',
        boxShadow: 'inset 5px 0 15px rgba(0,0,0,0.3)',
        height: '100vh'
      }}>
        <h2 style={{color:'#fff', fontSize:'1.1rem', marginBottom:'0.8rem'}}>
          Controles
        </h2>

        {/* Distribute Troops Section */}
        <div style={{
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
          borderRadius: '10px',
          border: '1px solid rgba(100,255,100,0.3)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
          overflow: 'hidden'
        }}>
          <div
            onClick={() => setExpandedSection(expandedSection === 'distribute' ? null : 'distribute')}
            style={{
              padding: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(100,255,100,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <h3 style={{color:'#fff', fontSize:'0.9rem', fontWeight:'bold', margin: 0}}>
              Distribuir Tropas
            </h3>
            <span style={{color:'#fff', fontSize:'1rem', transition: 'transform 0.2s ease', transform: expandedSection === 'distribute' ? 'rotate(180deg)' : 'rotate(0deg)'}}>
              ▼
            </span>
          </div>
          {expandedSection === 'distribute' && (<div style={{padding: '0 0.75rem 0.75rem 0.75rem'}}>
          <div style={{marginBottom:'0.5rem'}}>
            <label style={{color:'#aaa', fontSize:'0.8rem', display:'block', marginBottom:'0.2rem'}}>
              Território:
            </label>
            <div style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(0,0,0,0.5)',
              color: selectedTerritory !== null ? '#FFD700' : '#888',
              fontSize: '0.85rem',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
            }}>
              {selectedTerritory !== null ? territories.find(t => t.id === selectedTerritory)?.name : 'Clique em um território no mapa'}
            </div>
          </div>
          <div style={{
            marginBottom: '0.5rem',
            padding: '0.5rem',
            borderRadius: '6px',
            background: 'rgba(0,255,0,0.1)',
            border: '1px solid rgba(0,255,0,0.2)',
            color: '#0f0',
            fontSize: '0.85rem',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            Tropas Disponíveis: 5
          </div>
          <button
            disabled={selectedTerritory === null}
            style={{
              width: '100%',
              padding: '0.5rem',
              background: selectedTerritory === null
                ? 'linear-gradient(135deg, #333 0%, #222 100%)'
                : 'linear-gradient(135deg, #00CC00 0%, #008800 100%)',
              color: selectedTerritory === null ? '#666' : '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: selectedTerritory === null ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              boxShadow: selectedTerritory === null
                ? 'none'
                : '0 4px 12px rgba(0,204,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (selectedTerritory !== null) {
                e.target.style.background = 'linear-gradient(135deg, #00AA00 0%, #006600 100%)';
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 6px 16px rgba(0,204,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedTerritory !== null) {
                e.target.style.background = 'linear-gradient(135deg, #00CC00 0%, #008800 100%)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,204,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)';
              }
            }}
            onClick={() => selectedTerritory !== null && console.log('Add 1 troop to', selectedTerritory)}>
            Adicionar 1 Tropa
          </button>
          </div>)}
        </div>

        {/* Move Troops Section */}
        <div style={{
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
          borderRadius: '10px',
          border: '1px solid rgba(100,150,255,0.3)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
          overflow: 'hidden'
        }}>
          <div
            onClick={() => setExpandedSection(expandedSection === 'move' ? null : 'move')}
            style={{
              padding: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(100,150,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <h3 style={{color:'#fff', fontSize:'0.9rem', fontWeight:'bold', margin: 0}}>
              Mover Tropas
            </h3>
            <span style={{color:'#fff', fontSize:'1rem', transition: 'transform 0.2s ease', transform: expandedSection === 'move' ? 'rotate(180deg)' : 'rotate(0deg)'}}>
              ▼
            </span>
          </div>
          {expandedSection === 'move' && (<div style={{padding: '0 0.75rem 0.75rem 0.75rem'}}>
          <div style={{marginBottom:'0.5rem'}}>
            <label style={{color:'#aaa', fontSize:'0.8rem', display:'block', marginBottom:'0.2rem'}}>
              De:
            </label>
            <div style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(0,0,0,0.5)',
              color: selectedTerritory !== null ? '#FFD700' : '#888',
              fontSize: '0.85rem',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
            }}>
              {selectedTerritory !== null ? territories.find(t => t.id === selectedTerritory)?.name : 'Clique em um território no mapa'}
            </div>
          </div>
          <div style={{marginBottom:'0.5rem'}}>
            <label style={{color:'#aaa', fontSize:'0.8rem', display:'block', marginBottom:'0.2rem'}}>
              Para:
            </label>
            <select
              disabled={selectedTerritory === null}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: selectedTerritory === null ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.5)',
                color: selectedTerritory === null ? '#555' : '#fff',
                fontSize: '0.85rem',
                cursor: selectedTerritory === null ? 'not-allowed' : 'pointer',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
              }}>
              <option value="">Selecione destino...</option>
              {territories.filter(t => t.id !== selectedTerritory).map(territory => (
                <option key={territory.id} value={territory.id}>{territory.name}</option>
              ))}
            </select>
          </div>
          <div style={{marginBottom:'0.5rem'}}>
            <label style={{color:'#aaa', fontSize:'0.8rem', display:'block', marginBottom:'0.2rem'}}>
              Tropas:
            </label>
            <input
              type="number"
              min="1"
              defaultValue="1"
              disabled={selectedTerritory === null}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: selectedTerritory === null ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.5)',
                color: selectedTerritory === null ? '#555' : '#fff',
                fontSize: '0.85rem',
                cursor: selectedTerritory === null ? 'not-allowed' : 'text',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
              }}
            />
          </div>
          <button
            disabled={selectedTerritory === null}
            style={{
              width: '100%',
              padding: '0.5rem',
              background: selectedTerritory === null
                ? 'linear-gradient(135deg, #333 0%, #222 100%)'
                : 'linear-gradient(135deg, #0080FF 0%, #0052CC 100%)',
              color: selectedTerritory === null ? '#666' : '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: selectedTerritory === null ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              boxShadow: selectedTerritory === null
                ? 'none'
                : '0 4px 12px rgba(0,102,255,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (selectedTerritory !== null) {
                e.target.style.background = 'linear-gradient(135deg, #0066FF 0%, #0040AA 100%)';
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 6px 16px rgba(0,102,255,0.5), inset 0 1px 0 rgba(255,255,255,0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedTerritory !== null) {
                e.target.style.background = 'linear-gradient(135deg, #0080FF 0%, #0052CC 100%)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,102,255,0.4), inset 0 1px 0 rgba(255,255,255,0.3)';
              }
            }}
            onClick={() => selectedTerritory !== null && console.log('Move troops from', selectedTerritory)}>
            Mover
          </button>
          </div>)}
        </div>

        {/* Attack Section */}
        <div style={{
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
          borderRadius: '10px',
          border: '1px solid rgba(255,100,100,0.3)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
          overflow: 'hidden'
        }}>
          <div
            onClick={() => setExpandedSection(expandedSection === 'attack' ? null : 'attack')}
            style={{
              padding: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,100,100,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <h3 style={{color:'#fff', fontSize:'0.9rem', fontWeight:'bold', margin: 0}}>
              Atacar
            </h3>
            <span style={{color:'#fff', fontSize:'1rem', transition: 'transform 0.2s ease', transform: expandedSection === 'attack' ? 'rotate(180deg)' : 'rotate(0deg)'}}>
              ▼
            </span>
          </div>
          {expandedSection === 'attack' && (<div style={{padding: '0 0.75rem 0.75rem 0.75rem'}}>
          <div style={{marginBottom:'0.5rem'}}>
            <label style={{color:'#aaa', fontSize:'0.8rem', display:'block', marginBottom:'0.2rem'}}>
              De:
            </label>
            <div style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(0,0,0,0.5)',
              color: selectedTerritory !== null ? '#FFD700' : '#888',
              fontSize: '0.85rem',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
            }}>
              {selectedTerritory !== null ? territories.find(t => t.id === selectedTerritory)?.name : 'Clique em um território no mapa'}
            </div>
          </div>
          <div style={{marginBottom:'0.5rem'}}>
            <label style={{color:'#aaa', fontSize:'0.8rem', display:'block', marginBottom:'0.2rem'}}>
              Alvo:
            </label>
            <select
              disabled={selectedTerritory === null}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: selectedTerritory === null ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.5)',
                color: selectedTerritory === null ? '#555' : '#fff',
                fontSize: '0.85rem',
                cursor: selectedTerritory === null ? 'not-allowed' : 'pointer',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
              }}>
              <option value="">Selecione alvo...</option>
              {territories.filter(t => t.id !== selectedTerritory).map(territory => (
                <option key={territory.id} value={territory.id}>{territory.name}</option>
              ))}
            </select>
          </div>
          <div style={{marginBottom:'0.5rem'}}>
            <label style={{color:'#aaa', fontSize:'0.8rem', display:'block', marginBottom:'0.2rem'}}>
              Exércitos:
            </label>
            <input
              type="number"
              min="1"
              defaultValue="1"
              disabled={selectedTerritory === null}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: selectedTerritory === null ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.5)',
                color: selectedTerritory === null ? '#555' : '#fff',
                fontSize: '0.85rem',
                cursor: selectedTerritory === null ? 'not-allowed' : 'text',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
              }}
            />
          </div>
          <button
            disabled={selectedTerritory === null}
            style={{
              width: '100%',
              padding: '0.5rem',
              background: selectedTerritory === null
                ? 'linear-gradient(135deg, #333 0%, #222 100%)'
                : 'linear-gradient(135deg, #FF3333 0%, #CC0000 100%)',
              color: selectedTerritory === null ? '#666' : '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: selectedTerritory === null ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              boxShadow: selectedTerritory === null
                ? 'none'
                : '0 4px 12px rgba(255,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (selectedTerritory !== null) {
                e.target.style.background = 'linear-gradient(135deg, #FF0000 0%, #AA0000 100%)';
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 6px 16px rgba(255,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedTerritory !== null) {
                e.target.style.background = 'linear-gradient(135deg, #FF3333 0%, #CC0000 100%)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(255,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)';
              }
            }}
            onClick={() => selectedTerritory !== null && console.log('Attack from', selectedTerritory)}>
            Atacar
          </button>
          </div>)}
        </div>

        {/* Trade Cards Section */}
        <div style={{
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
          borderRadius: '10px',
          border: '1px solid rgba(255,215,0,0.3)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
          overflow: 'hidden'
        }}>
          <div
            onClick={() => setExpandedSection(expandedSection === 'trade' ? null : 'trade')}
            style={{
              padding: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,215,0,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <h3 style={{color:'#fff', fontSize:'0.9rem', fontWeight:'bold', margin: 0}}>
              Trocar Cartas
            </h3>
            <span style={{color:'#fff', fontSize:'1rem', transition: 'transform 0.2s ease', transform: expandedSection === 'trade' ? 'rotate(180deg)' : 'rotate(0deg)'}}>
              ▼
            </span>
          </div>
          {expandedSection === 'trade' && (<div style={{padding: '0 0.75rem 0.75rem 0.75rem'}}>
          <div style={{
            marginBottom: '0.5rem',
            padding: '0.5rem',
            borderRadius: '6px',
            background: 'rgba(255,215,0,0.1)',
            border: '1px solid rgba(255,215,0,0.2)',
            color: '#FFD700',
            fontSize: '0.85rem',
            textAlign: 'center'
          }}>
            Troque 3 cartas do mesmo símbolo por tropas extras
          </div>
          <button style={{
            width: '100%',
            padding: '0.5rem',
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.85rem',
            boxShadow: '0 4px 12px rgba(255,215,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #FFC700 0%, #FF8C00 100%)';
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow = '0 6px 16px rgba(255,215,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(255,215,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)';
          }}
          onClick={() => console.log('Trade cards')}>
            Trocar Cartas
          </button>
          </div>)}
        </div>
      </div>
    </div>
  );
};

export default Game;
