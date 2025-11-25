import React from 'react';

const AttackControl = ({ selectedTerritory, isExpanded, onToggle }) => {

	return (
		<div className="mb-4 bg-gradient-to-br from-white/12 to-white/6 rounded-[10px] border border-red-500/30 shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden">
			<div
				onClick={onToggle}
				className="p-3 cursor-pointer flex justify-between items-center transition-colors duration-200 hover:bg-red-500/10"
			>
				<h3 className="text-white text-sm font-bold m-0">
					Atacar
				</h3>
				<span className={`text-white text-base transition-transform duration-200 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
					▼
				</span>
			</div>
			{isExpanded && selectedTerritory != null && (
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
							disabled={selectedTerritory === null}
							className={`w-full p-2 rounded-md border border-white/20 text-[0.85rem] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] ${selectedTerritory === null ? 'bg-black/30 text-gray-600 cursor-not-allowed' : 'bg-black/50 text-white cursor-pointer'}`}
						>
							<option value="">Selecione alvo...</option>
						</select>
					</div>
					<div className="mb-2">
						<label className="text-gray-400 text-xs block mb-0.5">
							Exércitos:
						</label>
						<input
							type="number"
							min="1"
							defaultValue="1"
							disabled={selectedTerritory === null}
							className={`w-full p-2 rounded-md border border-white/20 text-[0.85rem] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] ${selectedTerritory === null ? 'bg-black/30 text-gray-600 cursor-not-allowed' : 'bg-black/50 text-white cursor-text'}`}
						/>
					</div>
					<button
						className="w-full p-2 rounded-lg border-none font-bold text-[0.85rem]"
						onClick={() => selectedTerritory !== null && console.log('Attack from', selectedTerritory)}
					>
						Atacar
					</button>
				</div>
			)}
		</div>
	);
};

export default AttackControl;
