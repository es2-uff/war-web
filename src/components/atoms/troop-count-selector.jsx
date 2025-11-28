import React from 'react';

const TroopCountSelector = ({ troopCount, onTroopCountChange, maxTroops, disabled, color = 'blue' }) => {
	const canDecrease = troopCount > 1;
	const canIncrease = troopCount < maxTroops;

	const handleDecrease = () => {
		if (canDecrease) {
			onTroopCountChange(Math.max(1, troopCount - 1));
		}
	};

	const handleIncrease = () => {
		if (canIncrease) {
			onTroopCountChange(Math.min(maxTroops, troopCount + 1));
		}
	};

	const hoverColor = color === 'blue' ? 'hover:bg-blue-500/20' : 'hover:bg-red-500/20';

	return (
		<div className="mb-2">
			<label className="text-gray-400 text-xs block mb-0.5">
				Tropas:
			</label>
			<div className="flex w-full rounded-md border border-white/20 overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
				<button
					disabled={disabled || !canDecrease}
					onClick={handleDecrease}
					className={`flex-1 p-2 text-[0.85rem] font-bold border-none transition-all duration-200 ${
						disabled || !canDecrease
							? 'bg-black/30 text-gray-600 cursor-not-allowed'
							: `bg-black/50 text-white cursor-pointer ${hoverColor}`
					}`}
				>
					-
				</button>
				<div className="w-px bg-white/20"></div>
				<div className="flex-[2] p-2 text-[0.85rem] font-bold bg-black/50 text-white text-center">
					{troopCount}
				</div>
				<div className="w-px bg-white/20"></div>
				<button
					disabled={disabled || !canIncrease}
					onClick={handleIncrease}
					className={`flex-1 p-2 text-[0.85rem] font-bold border-none transition-all duration-200 ${
						disabled || !canIncrease
							? 'bg-black/30 text-gray-600 cursor-not-allowed'
							: `bg-black/50 text-white cursor-pointer ${hoverColor}`
					}`}
				>
					+
				</button>
			</div>
		</div>
	);
};

export default TroopCountSelector;
