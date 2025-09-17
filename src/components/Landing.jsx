import React, { useState } from 'react';
import '../assets/styles/landing.css';

const mockSalas = [
  { nome: 'Sala do João', host: 'João', vagas: 4 },
  { nome: 'Sala da Ana', host: 'Ana', vagas: 6 },
  { nome: 'Sala 3', host: 'Carlos', vagas: 3 },
];

const Landing = () => {
  const [showSalas, setShowSalas] = useState(false);

  return (
    <div className="landing-container">
      <div className="content-box" style={{display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'center', height:'80vh'}}>
        <h1 className="title">WAR</h1>
        {!showSalas ? (
          <div className="buttons-container" style={{marginTop:'2rem'}}>
            <button className="game-button" onClick={() => setShowSalas(true)}>Play Now</button>
            <button className="game-button">How To Play</button>
            <button className="game-button">About</button>
            <button className="game-button">Contact</button>
          </div>
        ) : (
          <div className="salas-container" style={{display:'flex', flexDirection:'row', width:'100%', height:'calc(100% - 7rem)', marginTop:'2rem'}}>
            <div style={{width:'50%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', borderRight:'1px solid #eee', height:'100%'}}>
              <button className="game-button" style={{width:'60%'}}>Criar Sala</button>
            </div>
            <div style={{width:'50%', padding:'2rem', display:'flex', flexDirection:'column', height:'100%'}}>
              <h2 style={{marginBottom:'1rem'}}>Juntar-se a uma sala</h2>
              <ul style={{listStyle:'none', padding:0}}>
                {mockSalas.map((sala, idx) => (
                  <li key={idx} style={{marginBottom:'1rem', padding:'1rem', border:'1px solid #ddd', borderRadius:'8px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(255,255,255,0.07)'}}>
                    <span><strong>{sala.nome}</strong> <span style={{color:'#888'}}>(Host: {sala.host})</span></span>
                    <span>{sala.vagas} vagas</span>
                    <button className="game-button" style={{marginLeft:'1rem'}}>Entrar</button>
                  </li>
                ))}
              </ul>
              <span style={{fontSize:'0.9rem', color:'#888'}}>Cada sala pode ter de 3 a 6 jogadores.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;