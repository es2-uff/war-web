import React, { useRef, useState, useEffect } from 'react';
import { getTerritories } from '../../data/territories';
import MapButton from '../atoms/map-button';

const GameMap = ({ territories, selectedTerritory, onTerritoryClick }) => {
	return (
		<div className="h-4/5 w-full relative overflow-hidden">
			<img
				src="/world-resize.jpeg"
				alt="World Map"
				className="absolute inset-0 w-full h-full object-fit"
			/>

			<div id="button-overlay" className="absolute w-full h-full pointer-events-none">
				{Object.keys(territories).map((t) => {
					const territory = territories[t];
					const isSelected = selectedTerritory === territory.id;

					return (
						<MapButton
							key={territory.id}
							territory={territory}
							isSelected={isSelected}
							onClick={() => onTerritoryClick(territory)}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default GameMap;
