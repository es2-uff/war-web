import React from 'react';

const ArmyCountSelector = ({ selectedTerritory, selectedArmyCount, onSelectCount }) => {
	return (
		<div className="mb-2">
			<label className="text-gray-400 text-xs block mb-0.5">
				Exércitos:
			</label>
			<div className="flex w-full rounded-md border border-white/20 overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
				<button
					disabled={selectedTerritory === null || (selectedTerritory?.armies || 0) < 2}
					onClick={() => onSelectCount(1)}
					className={`flex-1 p-2 text-[0.85rem] font-bold border-none transition-all duration-200 ${
						selectedTerritory === null || (selectedTerritory?.armies || 0) < 2
							? 'bg-black/30 text-gray-600 cursor-not-allowed'
							: selectedArmyCount === 1
								? 'bg-red-500/40 text-white cursor-pointer'
								: 'bg-black/50 text-white cursor-pointer hover:bg-red-500/20'
					}`}
				>
					1
				</button>
				<div className="w-px bg-white/20"></div>
				<button
					disabled={selectedTerritory === null || (selectedTerritory?.armies || 0) < 3}
					onClick={() => onSelectCount(2)}
					className={`flex-1 p-2 text-[0.85rem] font-bold border-none transition-all duration-200 ${
						selectedTerritory === null || (selectedTerritory?.armies || 0) < 3
							? 'bg-black/30 text-gray-600 cursor-not-allowed'
							: selectedArmyCount === 2
								? 'bg-red-500/40 text-white cursor-pointer'
								: 'bg-black/50 text-white cursor-pointer hover:bg-red-500/20'
					}`}
				>
					2
				</button>
				<div className="w-px bg-white/20"></div>
				<button
					disabled={selectedTerritory === null || (selectedTerritory?.armies || 0) < 4}
					onClick={() => onSelectCount(3)}
					className={`flex-1 p-2 text-[0.85rem] font-bold border-none transition-all duration-200 ${
						selectedTerritory === null || (selectedTerritory?.armies || 0) < 4
							? 'bg-black/30 text-gray-600 cursor-not-allowed'
							: selectedArmyCount === 3
								? 'bg-red-500/40 text-white cursor-pointer'
								: 'bg-black/50 text-white cursor-pointer hover:bg-red-500/20'
					}`}
				>
					3
				</button>
			</div>
		</div>
	);
};

export default ArmyCountSelector;
