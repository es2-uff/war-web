import React from 'react';

const TurnFinishButton = ({ handleFinishTurn, turnState }) => {

	return (
		<button
			onClick={handleFinishTurn}
			className="flex items-center justify-center text-white p-3 bg-gradient-to-br from-white/12 to-white/6 rounded-[10px] border border-green-500/30 shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] cursor-pointer hover:bg-green-500/10 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
		>
			<img className="w-10" src="/pass.svg"/>
			{ turnState === 3  &&
				<span className="ml-2 font-bold text-sm">Finalizar Turno</span>
			}

			{ turnState === -1  &&
				<span className="ml-2 font-bold text-sm">Finalizar Distribuição inicial</span>
			}
		</button>
	);
};

export default TurnFinishButton;
