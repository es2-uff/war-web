import React from 'react';

const MoveTroops = ({ selectedTerritory, territories }) => {

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
						disabled={selectedTerritory === null}
						className={`w-full p-2 rounded-md border border-white/20 text-[0.85rem] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] ${selectedTerritory === null ? 'bg-black/30 text-gray-600 cursor-not-allowed' : 'bg-black/50 text-white cursor-pointer'}`}
					>
						<option value="">Selecione destino...</option>
						<option>adkasdj</option>
					</select>
				</div>
				<div className="mb-2">
					<label className="text-gray-400 text-xs block mb-0.5">
						Tropas:
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
					disabled={selectedTerritory === null}
					className={`w-full p-2 rounded-lg border-none font-bold text-[0.85rem] transition-all duration-200 ${
						selectedTerritory === null
							? 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-500 cursor-not-allowed'
							: 'bg-gradient-to-br from-blue-600 to-blue-700 text-white cursor-pointer hover:from-blue-500 hover:to-blue-600 hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(37,99,235,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] hover:shadow-[0_6px_16px_rgba(37,99,235,0.5),inset_0_1px_0_rgba(255,255,255,0.3)]'
					}`}
					onClick={() => selectedTerritory !== null && console.log('Move troops from', selectedTerritory)}
				>
					Mover
				</button>
			</div>
		</div>
	);
};

export default MoveTroops;
