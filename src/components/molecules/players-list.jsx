import React from 'react';

const PlayersList = ({ players, currentTurn }) => {
	return (
		<div>
			<h2 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '1rem' }}>
				Jogadores ({players.length})
			</h2>
			<ul style={{ listStyle: 'none', padding: 0 }}>
				{players.map((player) => (
					<li key={player.id} style={{
						marginBottom: '0.8rem',
						padding: '1rem',
						border: player.id === currentTurn ? '2px solid rgba(255,215,0,0.6)' : '1px solid rgba(255,255,255,0.15)',
						borderRadius: '12px',
						background: player.id === currentTurn
							? 'linear-gradient(135deg, rgba(255,215,0,0.25) 0%, rgba(255,180,0,0.15) 100%)'
							: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)',
						color: '#fff',
						fontSize: '1rem',
						boxShadow: player.id === currentTurn
							? '0 4px 12px rgba(255,215,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
							: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
						transition: 'all 0.3s ease'
					}}>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<span style={{ fontWeight: player.is_owner ? 'bold' : 'normal' }}>
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
		</div>
	);
};

export default PlayersList;
