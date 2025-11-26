import React from 'react';

const TradeCards = () => {
	return (
		<div className="mb-4 bg-gradient-to-br from-white/12 to-white/6 rounded-[10px] border border-yellow-500/30 shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden">
			<div className="p-3 flex justify-between items-center">
				<h3 className="text-white text-sm font-bold m-0">
					Trocar Cartas
				</h3>
			</div>
			<div className="px-3 pb-3">
				<div className="mb-2 p-2 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[0.85rem] text-center">
					Troque 3 cartas do mesmo símbolo por tropas extras
				</div>
				<button
					className="w-full p-2 rounded-lg border-none font-bold text-[0.85rem] transition-all duration-200 bg-gradient-to-br from-yellow-500 to-orange-500 text-black cursor-pointer hover:from-yellow-400 hover:to-orange-400 hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(234,179,8,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] hover:shadow-[0_6px_16px_rgba(234,179,8,0.5),inset_0_1px_0_rgba(255,255,255,0.3)]"
					onClick={() => console.log('Trade cards')}
				>
					Trocar Cartas
				</button>
			</div>
		</div>
	);
};

export default TradeCards;
