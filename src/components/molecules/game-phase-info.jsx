import React from 'react';

const GamePhaseInfo = ({ phase, phaseTranslations }) => {
	return (
		<div style={{
			marginTop: '1rem',
			padding: '1rem',
			background: 'linear-gradient(135deg, rgba(0,150,255,0.3) 0%, rgba(0,100,200,0.2) 100%)',
			border: '2px solid rgba(0,150,255,0.6)',
			borderRadius: '12px',
			boxShadow: '0 4px 12px rgba(0,150,255,0.25), inset 0 1px 0 rgba(255,255,255,0.2)'
		}}>
			<div style={{ color: '#5dade2', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
				Fase:
			</div>
			<div style={{ color: '#fff', textTransform: 'capitalize', fontSize: '1.1rem', fontWeight: '600' }}>
				{phaseTranslations[phase] || phase}
			</div>
		</div>
	);
};

export default GamePhaseInfo;
