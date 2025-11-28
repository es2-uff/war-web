import React, { useState, useEffect } from 'react';
import TroopCountSelector from '../atoms/troop-count-selector';

const MoveTroops = ({ selectedTerritory, territories, handleTroopMove }) => {
	const [targetTerritory, setTargetTerritory] = useState(null);
	const [troopsToMove, setTroopsToMove] = useState(1);


	useEffect(() => {
		setTroopsToMove(1);
	}, [selectedTerritory]);

	const getAdjacentOwnedTerritories = () => {
		if (!selectedTerritory || !territories) return [];

		const territoriesArray = Object.values(territories);

		const adjacentTerritories = selectedTerritory.adjacent
			?.map(adjId => territoriesArray.find(t => t.id === adjId))
			.filter(t => t) || [];

		return adjacentTerritories.filter(t => t.owner === selectedTerritory.owner);
	};

	const adjacentOwnedTerritories = getAdjacentOwnedTerritories();

	return (
		<div className="mb-4 bg-gradient-to-br from-white/12 to-white/6 rounded-[10px] border border-blue-500/30 shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden">
			<div className="p-3 flex justify-between items-center">
				<h3 className="text-white text-sm font-bold m-0">
					Mover Tropas
				</h3>
			</div>
			<div className="px-3 pb-3">
				<div className="mb-2">
					<label className="text-gray-400 text-xs block mb-0.5">
						De:
					</label>
					<div className={`w-full p-2 rounded-md border border-white/20 bg-black/50 text-[0.85rem] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] ${selectedTerritory !== null ? 'text-yellow-500' : 'text-gray-500'}`}>
						{selectedTerritory?.name || 'Clique em um território no mapa'}
					</div>
				</div>
				<div className="mb-2">
					<label className="text-gray-400 text-xs block mb-0.5">
						Para:
					</label>
					<select
						disabled={selectedTerritory === null || adjacentOwnedTerritories.length === 0}
						value={targetTerritory || ""}
						onChange={(e) => setTargetTerritory(e.target.value)}
						className={`w-full p-2 rounded-md border border-white/20 text-[0.85rem] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] ${selectedTerritory === null || adjacentOwnedTerritories.length === 0 ? 'bg-black/30 text-gray-600 cursor-not-allowed' : 'bg-black/50 text-white cursor-pointer'}`}
					>
						<option value="">
							{adjacentOwnedTerritories.length === 0
								? 'Nenhum território adjacente seu'
								: 'Selecione destino...'}
						</option>
						{adjacentOwnedTerritories.map(territory => (
							<option key={territory.id} value={territory.id}>
								{territory.name}
							</option>
						))}
					</select>
				</div>
				<TroopCountSelector
					troopCount={troopsToMove}
					onTroopCountChange={setTroopsToMove}
					maxTroops={selectedTerritory ? selectedTerritory.armies - 1 : 1}
					disabled={selectedTerritory === null || (selectedTerritory?.armies || 0) < 2}
					color="blue"
				/>
				<button
					disabled={selectedTerritory === null || (selectedTerritory?.armies || 0) < 2 || !targetTerritory}
					className={`w-full p-2 rounded-lg border-none font-bold text-[0.85rem] transition-all duration-200 ${
						selectedTerritory === null || (selectedTerritory?.armies || 0) < 2 || !targetTerritory
							? 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-500 cursor-not-allowed'
							: 'bg-gradient-to-br from-blue-600 to-blue-700 text-white cursor-pointer hover:from-blue-500 hover:to-blue-600 hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(37,99,235,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] hover:shadow-[0_6px_16px_rgba(37,99,235,0.5),inset_0_1px_0_rgba(255,255,255,0.3)]'
					}`}
					onClick={() => {
						if (selectedTerritory !== null && (selectedTerritory?.armies || 0) >= 2 && targetTerritory) {
							handleTroopMove(selectedTerritory, targetTerritory, troopsToMove);
						}
					}}
				>
					Mover
				</button>
			</div>
		</div>
	);
};

export default MoveTroops;
