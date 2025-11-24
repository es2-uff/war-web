import React from 'react';

const ObjectiveInfo = ({ objectiveDesc }) => {

	return (
		<div style={{
			marginTop: '1.5rem',
			padding: '1rem',
			background: 'linear-gradient(135deg, rgba(2,5,180,0.3) 0%, rgba(2,5,180,0.2) 100%)',
			border: '2px solid rgba(255,180,0,0.6)',
			borderRadius: '12px',
			boxShadow: '0 4px 12px rgba(2,5,180,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
		}}>
			<div style={{ color: '#ffd700', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
				Turno Atual:
			</div>
			<div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '600' }}>
				{ objectiveDesc }
			</div>
		</div>
	);
};

export default ObjectiveInfo;
