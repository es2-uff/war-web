import React, { useState } from 'react';
import ArmyCountSelector from '../atoms/army-count-selector';

const AttackControl = ({ selectedTerritory, territories, handleAttackTerritory }) => {
	const [selectedArmyCount, setSelectedArmyCount] = useState(1);
	const [targetTerritory, setTargetTerritory] = useState(null);

	// Get adjacent territories that belong to other players
	const getAdjacentEnemyTerritories = () => {
		if (!selectedTerritory || !territories) return [];

		const territoriesArray = Object.values(territories);

		const adjacentTerritories = selectedTerritory.adjacent
			?.map(adjId => territoriesArray.find(t => t.id === adjId))
			.filter(t => t) || [];

		return adjacentTerritories.filter(t => t.owner !== selectedTerritory.owner);
	};

	const adjacentEnemyTerritories = getAdjacentEnemyTerritories();

	return (
		<div className="mb-4 bg-gradient-to-br from-white/12 to-white/6 rounded-[10px] border border-red-500/30 shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden">
			<div className="p-3 flex justify-between items-center">
				<h3 className="text-white text-sm font-bold m-0">
					Atacar
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
						Alvo:
					</label>
					<select
						disabled={selectedTerritory === null || adjacentEnemyTerritories.length === 0}
						value={targetTerritory || ""}
						onChange={(e) => setTargetTerritory(e.target.value)}
						className={`w-full p-2 rounded-md border border-white/20 text-[0.85rem] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] ${selectedTerritory === null || adjacentEnemyTerritories.length === 0 ? 'bg-black/30 text-gray-600 cursor-not-allowed' : 'bg-black/50 text-white cursor-pointer'}`}
					>
						<option value="">
							{adjacentEnemyTerritories.length === 0
								? 'Nenhum território inimigo adjacente'
								: 'Selecione alvo...'}
						</option>
						{adjacentEnemyTerritories.map(territory => (
							<option key={territory.id} value={territory.id}>
								{territory.name}
							</option>
						))}
					</select>
				</div>
				<ArmyCountSelector
					selectedTerritory={selectedTerritory}
					selectedArmyCount={selectedArmyCount}
					onSelectCount={setSelectedArmyCount}
				/>
				<button
					disabled={selectedTerritory === null || (selectedTerritory?.armies || 0) < 2 || !targetTerritory}
					className={`w-full p-2 rounded-lg border-none font-bold text-[0.85rem] transition-all duration-200 ${selectedTerritory === null || (selectedTerritory?.armies || 0) < 2 || !targetTerritory ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-br from-red-600 to-red-700 text-white cursor-pointer hover:from-red-500 hover:to-red-600 shadow-[0_4px_12px_rgba(220,38,38,0.4)]'}`}
					onClick={() => {
						if (selectedTerritory !== null && (selectedTerritory?.armies || 0) >= 2 && targetTerritory) {
							handleAttackTerritory(selectedTerritory, targetTerritory, selectedArmyCount);
						}
					}}
				>
					Atacar
				</button>
			</div>
		</div>
	);
};

export default AttackControl;
