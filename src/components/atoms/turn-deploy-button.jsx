import React from 'react';

const TurnDeployButton = ({ handleDeployTroops, turnState }) => {
	return (
		<button
			disabled={ turnState > 0 || turnState === -1}
			className="flex items-center text-white p-3 bg-gradient-to-br from-white/12 to-white/6 rounded-[10px] border border-blue-500/30 shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] cursor-pointer hover:bg-blue-500/10 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
		>
			<img className="w-10" src="/parachute.svg"/>
			{ (turnState === 0 ) &&
				<span className="ml-2 font-bold text-sm">Distribuir exércitos</span>
			}
		</button>
	);
};

export default TurnDeployButton;
