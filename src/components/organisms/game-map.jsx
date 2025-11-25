import React, { useRef, useState, useEffect } from 'react';
import { getTerritories } from '../../data/territories';

const GameMap = ({ gameState, selectedTerritory, onTerritoryClick }) => {
	const playerIds = Object.keys(gameState.players);
	const territories = gameState.territories;
	const territoriesData = getTerritories(playerIds);
	const containerRef = useRef(null);
	const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const updateSize = () => {
			if (containerRef.current) {
				setContainerSize({
					width: containerRef.current.offsetWidth,
					height: containerRef.current.offsetHeight
				});
			}
		};

		updateSize();
		window.addEventListener('resize', updateSize);
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	const territoriesMap = territoriesData.reduce((acc, territory) => {
		acc[territory.name] = territory;
		return acc;
	}, {});

	console.log('Game State Territories:', gameState.territories);

	return (
		<div ref={containerRef} className="h-4/5 w-full relative overflow-hidden">
			<img
				src="/world-resize.jpeg"
				alt="World Map"
				className="absolute inset-0 w-full h-full object-fit"
			/>

			<div id="button-overlay" className="absolute w-full h-full pointer-events-none">
				{territories.map((territory) => {
					const owner = territory.owner ? gameState.players[territory.owner] : null;
					const baseColor = owner ? owner.color : '#666666';
					const rgbaColor = baseColor.startsWith('#')
						? `${baseColor}CC` // Add alpha to hex
						: baseColor.replace(')', ', 0.8)').replace('rgb', 'rgba');
					const hoverColor = owner ? owner.color : '#888888';
					const isSelected = selectedTerritory === territory.id;

					// Get territory data with fallback (lookup by name since IDs are UUIDs)
					const territoryData = territoriesMap[territory.name];
					if (!territoryData) {
						console.warn(`Territory "${territory.name}" not found in territoriesMap`);
						return null; // Skip rendering if no data
					}

					return (
						<div
							key={territory.id}
							className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
							style={{ left: `${territoryData.x}%`, top: `${territoryData.y}%` }}
						>
							<button
								onClick={() => onTerritoryClick(territory.id)}
								className={`
									w-[35px] h-[35px] rounded-full flex items-center justify-center
									cursor-pointer transition-all duration-200 ease-in-out
									text-white font-bold text-sm [text-shadow:_1px_1px_2px_rgba(0,0,0,0.8)]
									bg-[var(--bg-color)]
									${isSelected
										? 'border-4 border-[#FFD700] scale-110 shadow-[0_0_12px_rgba(255,215,0,0.8)]'
										: 'border-[3px] border-white/90 scale-100 shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:scale-[1.15] hover:border-white hover:shadow-[0_4px_8px_rgba(0,0,0,0.5)] hover:bg-[var(--hover-color)]'
									}
								`}
								style={{
									'--bg-color': rgbaColor,
									'--hover-color': hoverColor,
								}}
							>
								{territory.armies}
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default GameMap;
