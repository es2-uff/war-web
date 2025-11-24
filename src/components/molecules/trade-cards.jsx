import React from 'react';

const TradeCards = ({ isExpanded, onToggle }) => {
	return (
		<div style={{
			marginBottom: '1rem',
			background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
			borderRadius: '10px',
			border: '1px solid rgba(255,215,0,0.3)',
			boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
			overflow: 'hidden'
		}}>
			<div
				onClick={onToggle}
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
				<h3 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 'bold', margin: 0 }}>
					Trocar Cartas
				</h3>
				<span style={{ color: '#fff', fontSize: '1rem', transition: 'transform 0.2s ease', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
					▼
				</span>
			</div>
			{isExpanded && (
				<div style={{ padding: '0 0.75rem 0.75rem 0.75rem' }}>
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
					<button
						style={{
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
						onClick={() => console.log('Trade cards')}
					>
						Trocar Cartas
					</button>
				</div>
			)}
		</div>
	);
};

export default TradeCards;
