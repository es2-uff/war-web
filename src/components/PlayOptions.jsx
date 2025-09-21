import React from 'react';
import { useHistory } from 'react-router-dom';

const mockSalas = [
  { nome: 'Sala do João', host: 'João', vagas: 4 },
  { nome: 'Sala da Ana', host: 'Ana', vagas: 6 },
  { nome: 'Sala 3', host: 'Carlos', vagas: 3 },
];

const PlayOptions = () => {
  const history = useHistory();

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
            <button className="game-button" style={{width: '100%'}} onClick={() => history.push('/sala?host=true')}>Host Game</button>
          </div>
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem'
          }}>
            <h2 style={{color:'#fff', marginBottom:'1.5rem', fontSize:'2rem', letterSpacing:'2px'}}>Join Session</h2>
            <ul style={{listStyle:'none', padding:0, width:'100%'}}>
              {mockSalas.map((sala, idx) => (
                <li key={idx} style={{
                  marginBottom:'1rem',
                  padding:'1rem',
                  border:'1px solid #ddd',
                  borderRadius:'8px',
                  display:'flex',
                  justifyContent:'space-between',
                  alignItems:'center',
                  background:'rgba(255,255,255,0.07)'
                }}>
                  <span>
                    <strong>{sala.nome}</strong>
                    <span style={{color:'#888'}}> (Host: {sala.host})</span>
                  </span>
                  <span>{sala.vagas} vagas</span>
                  <button className="game-button" style={{marginLeft:'1rem', padding:'0.5rem 1rem'}}
                    onClick={() => history.push(`/sala?host=false&sala=${encodeURIComponent(sala.nome)}`)}>
                    Entrar
                  </button>
                </li>
              ))}
            </ul>
            <span style={{fontSize:'0.9rem', color:'#888'}}>Cada sala pode ter de 3 a 6 jogadores.</span>
          </div>
        </div>
        <button className="game-button" style={{marginTop: '2rem'}} onClick={() => history.push('/')}>Voltar</button>
      </div>
    </div>
  );
};

export default PlayOptions;