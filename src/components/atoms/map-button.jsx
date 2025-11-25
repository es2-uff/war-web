import React from 'react';

const MapButton = ({ territory, isSelected, onClick }) => {
	const baseColor = territory.owner_color;
	const rgbaColor = baseColor.startsWith('#')
		? `${baseColor}CC` // Add alpha to hex
		: baseColor.replace(')', ', 0.8)').replace('rgb', 'rgba');
	const hoverColor = territory.owner_color;


	return (
		<div
			className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
			style={{ left: `${territory.x}%`, top: `${territory.y}%` }}
		>
			<button
				onClick={onClick}
				className={`
					w-[35px] h-[35px] rounded-full flex items-center justify-center
					cursor-pointer transition-all duration-200 ease-in-out
					text-white font-bold text-sm [text-shadow:_1px_1px_2px_rgba(0,0,0,0.8)]
					bg-[var(--bg-color)]
					${isSelected
						? 'border-4 border-[#FFD700] scale-110 shadow-[0_0_12px_rgba(255,215,0,0.8)]'
						: 'border-[3px] border-white/90 scale-100 shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:scale-[1.15] hover:border-white hover:shadow-[0_4px_8px_rgba(0,0,0,0.5)] hover:bg-[var(--hover-color)]'
					}
				`}
				style={{
					'--bg-color': rgbaColor,
					'--hover-color': hoverColor,
				}}
			>
				{territory.armies}
			</button>
		</div>
	);
};

export default MapButton;
