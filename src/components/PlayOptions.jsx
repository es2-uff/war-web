import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const API_URL = 'http://localhost:8080/api/v1';

const PlayOptions = () => {
  const history = useHistory();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [showCreateInput, setShowCreateInput] = useState(false);
  const username = localStorage.getItem('username') || 'Guest';

  useEffect(() => {
    fetchRooms();
    const interval = setInterval(fetchRooms, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${API_URL}/rooms/all`);
      if (response.ok) {
        const text = await response.text();
        if (text) {
          const data = JSON.parse(text);
          setRooms(data || []);
        } else {
          setRooms([]);
        }
      } else {
        console.error('Failed to fetch rooms:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const createRoom = async () => {
    if (!roomName.trim()) {
      setShowCreateInput(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/rooms/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_name: roomName.trim(),
          owner_name: username
        })
      });

      if (response.ok) {
        const room = await response.json();
        history.push(`/sala?room_id=${room.room_id}&owner_id=${room.owner_id}&host=true`);
      }
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Failed to create room. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const joinRoom = (room) => {
    history.push(`/sala?room_id=${room.room_id}&sala=${encodeURIComponent(room.room_name)}&host=false`);
  };

  return (
    <div className="landing-container">
      <div className="content-box" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh'
      }}>
        <h1 className="title">WAR</h1>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'stretch',
          width: '100%',
          marginTop: '3rem',
          marginBottom: '3rem',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRight: '2px solid rgba(255,255,255,0.2)',
            padding: '2rem'
          }}>
            <h2 style={{color:'#fff', marginBottom:'1.5rem', fontSize:'1.5rem'}}>Host Game</h2>
            {showCreateInput && (
              <input
                type="text"
                placeholder="Room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && createRoom()}
                style={{
                  width:'100%',
                  padding:'0.8rem',
                  marginBottom:'1rem',
                  fontSize:'1rem',
                  borderRadius:'8px',
                  border:'2px solid #ff3b3b',
                  background:'rgba(255,255,255,0.9)',
                  outline:'none'
                }}
                autoFocus
                maxLength={30}
              />
            )}
            <button
              className="game-button"
              style={{width: '100%'}}
              onClick={createRoom}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Room'}
            </button>
          </div>
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem'
          }}>
            <h2 style={{color:'#fff', marginBottom:'1.5rem', fontSize:'1.5rem'}}>Join Session</h2>
            <div style={{width:'100%', maxHeight:'300px', overflowY:'auto'}}>
              {rooms.length === 0 ? (
                <p style={{color:'#888', textAlign:'center'}}>No rooms available</p>
              ) : (
                <ul style={{listStyle:'none', padding:0, width:'100%'}}>
                  {rooms.map((room) => (
                    <li key={room.room_id} style={{
                      marginBottom:'1rem',
                      padding:'1rem',
                      border:'1px solid #ddd',
                      borderRadius:'8px',
                      display:'flex',
                      justifyContent:'space-between',
                      alignItems:'center',
                      background:'rgba(255,255,255,0.07)'
                    }}>
                      <div>
                        <strong>{room.room_name}</strong>
                        <div style={{color:'#888', fontSize:'0.9rem'}}>
                          Host: {room.owner_name}
                        </div>
                      </div>
                      <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                        <span>{room.player_count}/{room.max_players}</span>
                        <button
                          className="game-button"
                          style={{padding:'0.5rem 1rem'}}
                          onClick={() => joinRoom(room)}
                          disabled={room.player_count >= room.max_players}
                        >
                          Join
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <span style={{fontSize:'0.9rem', color:'#888', marginTop:'1rem'}}>3-6 players per room</span>
          </div>
        </div>
        <button className="game-button" style={{marginTop: '2rem'}} onClick={() => history.push('/')}>Back</button>
      </div>
    </div>
  );
};

export default PlayOptions;