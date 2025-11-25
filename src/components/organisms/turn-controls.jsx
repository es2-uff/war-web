import React from 'react';

const TurnControls = () => {

	return (
		<div className="absolute left-1/2 -translate-x-1/2 px-6 py-3 flex items-center justify-center bottom-38.5 gap-x-4 bg-gradient-to-b from-[rgba(20,20,30,0.95)] to-[rgba(10,10,20,0.95)] rounded-t-2xl">
			<div className="flex items-center text-white p-3 bg-gradient-to-br from-white/12 to-white/6 rounded-[10px] border border-blue-500/30 shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] cursor-pointer hover:bg-blue-500/10 transition-colors duration-200">
				<img className="w-10 mr-2" src="public/parachute.svg"/>
				<span className="font-bold text-sm">Distribuir exércitos</span>
			</div>

			<div className="flex items-center justify-center text-white p-3 bg-gradient-to-br from-white/12 to-white/6 rounded-[10px] border border-red-500/30 shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] cursor-pointer hover:bg-red-500/10 transition-colors duration-200">
				<img className="w-10" src="public/invade.svg"/>
			</div>

			<div className="flex items-center justify-center text-white p-3 bg-gradient-to-br from-white/12 to-white/6 rounded-[10px] border border-yellow-500/30 shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] cursor-pointer hover:bg-yellow-500/10 transition-colors duration-200">
				<img className="w-10" src="public/trip.svg"/>
			</div>

			<div className="flex items-center justify-center text-white p-3 bg-gradient-to-br from-white/12 to-white/6 rounded-[10px] border border-green-500/30 shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] cursor-pointer hover:bg-green-500/10 transition-colors duration-200">
				<img className="w-10" src="public/pass.svg"/>
			</div>
		</div>
	);
};

export default TurnControls;
