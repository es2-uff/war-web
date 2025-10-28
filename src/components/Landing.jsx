import React from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/styles/landing.css';

const Landing = () => {
  const history = useHistory();

  return (
    <div className="landing-container">
      <div className="content-box" style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center', height:'80vh'}}>
        <h1 className="title">WAR</h1>
        <div className="buttons-container" style={{marginTop:'2rem', marginBottom:'10vh'}}>
          <button className="game-button" onClick={() => history.push('/play-options')}>Play</button>
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