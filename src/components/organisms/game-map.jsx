import React from 'react';
import { getTerritories } from '../../data/territories';

const GameMap = ({ gameState, selectedTerritory, onTerritoryClick }) => {
	const playerIds = Object.keys(gameState.players);
	const territories = getTerritories(playerIds);

	return (
		<div style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			padding: '2rem',
			overflowY: 'auto'
		}}>
			<div style={{
				position: 'relative',
				width: '100%',
				maxWidth: '100%'
			}}>
				<img
					src="/brasil.jpg"
					alt="World Map"
					style={{
						width: '100%',
						height: 'auto',
						display: 'block'
					}}
				/>

				{/* Territory buttons */}
				{territories.map((territory) => {
					const owner = territory.owner ? gameState.players[territory.owner] : null;
					const baseColor = owner ? owner.color : '#666666';
					const rgbaColor = baseColor.startsWith('#')
						? `${baseColor}CC` // Add alpha to hex
						: baseColor.replace(')', ', 0.8)').replace('rgb', 'rgba');
					const hoverColor = owner ? owner.color : '#888888';
					const isSelected = selectedTerritory === territory.id;

					return (
						<div
							key={territory.id}
							style={{
								position: 'absolute',
								left: `${territory.x}%`,
								top: `${territory.y}%`,
								transform: 'translate(-50%, -50%)',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								zIndex: 10
							}}
						>
							<button
								onClick={() => onTerritoryClick(territory.id)}
								style={{
									width: '35px',
									height: '35px',
									borderRadius: '50%',
									border: isSelected ? '4px solid #FFD700' : '3px solid rgba(255, 255, 255, 0.9)',
									background: rgbaColor,
									cursor: 'pointer',
									transition: 'all 0.2s ease',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: '#fff',
									fontWeight: 'bold',
									fontSize: '14px',
									textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
									boxShadow: isSelected ? '0 0 12px rgba(255, 215, 0, 0.8)' : '0 2px 4px rgba(0,0,0,0.3)',
									transform: isSelected ? 'scale(1.1)' : 'scale(1)'
								}}
								onMouseEnter={(e) => {
									if (!isSelected) {
										e.currentTarget.style.background = hoverColor;
										e.currentTarget.style.transform = 'scale(1.15)';
										e.currentTarget.style.border = '3px solid rgba(255, 255, 255, 1)';
										e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.5)';
									}
								}}
								onMouseLeave={(e) => {
									if (!isSelected) {
										e.currentTarget.style.background = rgbaColor;
										e.currentTarget.style.transform = 'scale(1)';
										e.currentTarget.style.border = '3px solid rgba(255, 255, 255, 0.9)';
										e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
									}
								}}
							>
								{territory.troops}
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default GameMap;
