import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const nomesBots = ['Bot Alpha', 'Bot Bravo', 'Bot Charlie', 'Bot Delta', 'Bot Echo', 'Bot Foxtrot'];

const Sala = () => {
  const query = useQuery();
  const history = useHistory();
  const isHost = query.get('host') === 'true';
  const hostName = query.get('hostName') || 'Host';
  const salaNomeParam = query.get('sala') || (isHost ? `Sala de ${hostName}` : 'Nova Sala');

  const [salaNome, setSalaNome] = useState(salaNomeParam);
  const [players, setPlayers] = useState(isHost ? [hostName] : ['Você', 'Host']);
  const [botIndex, setBotIndex] = useState(0);

  const addBot = () => {
    if (players.length < 6 && botIndex < nomesBots.length) {
      setPlayers([...players, nomesBots[botIndex]]);
      setBotIndex(botIndex + 1);
    }
  };

  const canStart = players.length >= 3;

  return (
    <div className="landing-container">
      <div className="content-box" style={{maxWidth:'500px', margin:'auto'}}>
        {isHost ? (
          <input
            type="text"
            value={salaNome}
            onChange={e => setSalaNome(e.target.value)}
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#ff3b3b',
              background: 'rgba(0,0,0,0.2)',
              border: 'none',
              borderRadius: '6px',
              textAlign: 'center',
              marginBottom: '1.5rem',
              padding: '0.5rem',
              outline: 'none'
            }}
            maxLength={30}
          />
        ) : (
          <h1 className="title" style={{fontSize: '1.5rem', marginBottom: '1.5rem'}}>{salaNome}</h1>
        )}
        <h2 style={{color:'#fff', fontSize:'1.3rem', marginBottom:'1rem'}}>Jogadores na sala</h2>
        <ul style={{listStyle:'none', padding:0, marginBottom:'2rem'}}>
          {players.map((p, idx) => (
            <li key={idx} style={{
              marginBottom:'0.5rem',
              padding:'0.5rem 1rem',
              border:'1px solid #ddd',
              borderRadius:'8px',
              background:'rgba(255,255,255,0.07)',
              color:'#fff',
              fontSize: '1.1rem'
            }}>
              {p}
            </li>
          ))}
          {[...Array(6 - players.length)].map((_, idx) => (
            <li key={players.length + idx} style={{
              marginBottom:'0.5rem',
              padding:'0.5rem 1rem',
              border:'1px dashed #888',
              borderRadius:'8px',
              background:'rgba(255,255,255,0.03)',
              color:'#888',
              display:'flex',
              justifyContent:'space-between',
              alignItems:'center',
              fontSize: '1.1rem'
            }}>
              Vaga livre
              {isHost && <button className="game-button" style={{padding:'0.2rem 0.7rem', fontSize:'0.9rem'}} onClick={addBot}>Adicionar Bot</button>}
            </li>
          ))}
        </ul>
        <button className="game-button" disabled={!canStart} style={{width:'100%', opacity: canStart ? 1 : 0.5, fontSize: '1.1rem'}}>Start</button>
        <button className="game-button" style={{marginTop:'1rem', width:'100%', fontSize: '1.1rem'}} onClick={() => history.push('/play-options')}>Voltar</button>
      </div>
    </div>
  );
};

export default Sala;