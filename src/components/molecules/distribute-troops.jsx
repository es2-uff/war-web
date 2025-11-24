import React from 'react';

const DistributeTroops = ({ selectedTerritory, territories, isExpanded, onToggle }) => {
	const selectedTerritoryData = selectedTerritory !== null ? territories.find(t => t.id === selectedTerritory) : null;

	return (
		<div style={{
			marginBottom: '1rem',
			background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
			borderRadius: '10px',
			border: '1px solid rgba(100,255,100,0.3)',
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
				onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(100,255,100,0.1)'}
				onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
			>
				<h3 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 'bold', margin: 0 }}>
					Distribuir Tropas
				</h3>
				<span style={{ color: '#fff', fontSize: '1rem', transition: 'transform 0.2s ease', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
					▼
				</span>
			</div>
			{isExpanded && (
				<div style={{ padding: '0 0.75rem 0.75rem 0.75rem' }}>
					<div style={{ marginBottom: '0.5rem' }}>
						<label style={{ color: '#aaa', fontSize: '0.8rem', display: 'block', marginBottom: '0.2rem' }}>
							Território:
						</label>
						<div style={{
							width: '100%',
							padding: '0.5rem',
							borderRadius: '6px',
							border: '1px solid rgba(255,255,255,0.2)',
							background: 'rgba(0,0,0,0.5)',
							color: selectedTerritory !== null ? '#FFD700' : '#888',
							fontSize: '0.85rem',
							boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
						}}>
							{selectedTerritoryData?.name || 'Clique em um território no mapa'}
						</div>
					</div>
					<div style={{
						marginBottom: '0.5rem',
						padding: '0.5rem',
						borderRadius: '6px',
						background: 'rgba(0,255,0,0.1)',
						border: '1px solid rgba(0,255,0,0.2)',
						color: '#0f0',
						fontSize: '0.85rem',
						textAlign: 'center',
						fontWeight: 'bold'
					}}>
						Tropas Disponíveis: 5
					</div>
					<button
						disabled={selectedTerritory === null}
						style={{
							width: '100%',
							padding: '0.5rem',
							background: selectedTerritory === null
								? 'linear-gradient(135deg, #333 0%, #222 100%)'
								: 'linear-gradient(135deg, #00CC00 0%, #008800 100%)',
							color: selectedTerritory === null ? '#666' : '#fff',
							border: 'none',
							borderRadius: '8px',
							cursor: selectedTerritory === null ? 'not-allowed' : 'pointer',
							fontWeight: 'bold',
							fontSize: '0.85rem',
							boxShadow: selectedTerritory === null
								? 'none'
								: '0 4px 12px rgba(0,204,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
							transition: 'all 0.2s ease'
						}}
						onMouseEnter={(e) => {
							if (selectedTerritory !== null) {
								e.target.style.background = 'linear-gradient(135deg, #00AA00 0%, #006600 100%)';
								e.target.style.transform = 'translateY(-1px)';
								e.target.style.boxShadow = '0 6px 16px rgba(0,204,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)';
							}
						}}
						onMouseLeave={(e) => {
							if (selectedTerritory !== null) {
								e.target.style.background = 'linear-gradient(135deg, #00CC00 0%, #008800 100%)';
								e.target.style.transform = 'translateY(0)';
								e.target.style.boxShadow = '0 4px 12px rgba(0,204,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)';
							}
						}}
						onClick={() => selectedTerritory !== null && console.log('Add 1 troop to', selectedTerritory)}
					>
						Adicionar 1 Tropa
					</button>
				</div>
			)}
		</div>
	);
};

export default DistributeTroops;
