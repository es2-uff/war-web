import React from 'react';

const TerritoryCard = ({ card, isSelected, isDisabled, onSelect }) => {
	const getShapeIcon = (shape) => {
		switch(shape) {
			case 0: return '●'; // Circle
			case 1: return '■'; // Square
			case 2: return '▲'; // Triangle
			default: return '?';
		}
	};

	const getShapeColor = (shape) => {
		switch(shape) {
			case 0: return 'text-blue-400'; // Circle
			case 1: return 'text-red-400';  // Square
			case 2: return 'text-green-400'; // Triangle
			default: return 'text-gray-400';
		}
	};

	const getButtonClasses = () => {
		const baseClasses = "border rounded p-2 flex items-center gap-2 transition-all duration-200 w-full";

		if (isDisabled) {
			return `${baseClasses} bg-gray-800/40 border-gray-600/30 opacity-50 cursor-not-allowed`;
		}

		if (isSelected) {
			return `${baseClasses} bg-amber-600/60 border-amber-400/70 shadow-lg cursor-pointer`;
		}

		return `${baseClasses} bg-amber-800/40 border-amber-500/30 hover:bg-amber-800/60 hover:border-amber-400/50 cursor-pointer`;
	};

	return (
		<button
			onClick={() => !isDisabled && onSelect()}
			disabled={isDisabled}
			className={getButtonClasses()}
		>
			<span className={`text-2xl ${getShapeColor(card.Shape)}`}>
				{getShapeIcon(card.Shape)}
			</span>
			<div className="text-white text-sm font-medium">
				{card.TerritoryName}
			</div>
		</button>
	);
};

export default TerritoryCard;
