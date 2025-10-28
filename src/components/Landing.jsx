import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/styles/landing.css';

const Landing = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handlePlay = () => {
    if (username.trim()) {
      localStorage.setItem('username', username.trim());
      history.push('/play-options');
    } else {
      setShowInput(true);
    }
  };

  return (
    <div className="landing-container">
      <div className="content-box" style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center', height:'80vh'}}>
        <h1 className="title">WAR</h1>
        {showInput && (
          <div style={{marginTop:'2rem', width:'80%', maxWidth:'400px'}}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handlePlay()}
              style={{
                width:'100%',
                padding:'0.8rem',
                fontSize:'1.1rem',
                borderRadius:'8px',
                border:'2px solid #ff3b3b',
                background:'rgba(255,255,255,0.9)',
                outline:'none'
              }}
              autoFocus
              maxLength={20}
            />
          </div>
        )}
        <div className="buttons-container" style={{marginTop:'2rem', marginBottom:'10vh'}}>
          <button className="game-button" onClick={handlePlay}>PLAY</button>
          <button className="game-button">How To Play</button>
          <button className="game-button">About</button>
          <button className="game-button">Contact</button>
          {/* Dev-only adjacency editor button intentionally excluded from this push */}
        </div>
      </div>
    </div>
  );
};

export default Landing;