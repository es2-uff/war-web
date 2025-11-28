import React, { useState } from 'react';
import TerritoryCard from '../atoms/territory-card';

const CardsModal = ({ cardsInHand, handleTradeCards }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedCardNames, setSelectedCardNames] = useState([]);

	const cards = cardsInHand && Array.isArray(cardsInHand) ? cardsInHand : [];

	const handleCardSelect = (index) => {
		const cardName = cards[index]?.TerritoryName;

		if (selectedCardNames.includes(cardName)) {
			// Unselect if clicking an already selected card
			setSelectedCardNames(selectedCardNames.filter(name => name !== cardName));
		} else if (selectedCardNames.length < 3) {
			// Select the card if less than 3 are selected
			setSelectedCardNames([...selectedCardNames, cardName]);
		}
	};

	const firstSelectedCard = selectedCardNames.length > 0
		? cards.find(c => c.TerritoryName === selectedCardNames[0])
		: null;
	const selectedShape = firstSelectedCard?.Shape ?? null;
	const canTrade = selectedCardNames.length === 3;

	const handleTrade = () => {
		if (canTrade) {
			handleTradeCards(selectedCardNames);
			setSelectedCardNames([]);
		}
	};

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="w-full mt-6 p-4 bg-gradient-to-br from-amber-900/40 to-amber-950/30 border-2 border-amber-400/50 rounded-xl shadow-[0_4px_12px_rgba(251,191,36,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] cursor-pointer hover:from-amber-800/50 hover:to-amber-900/40 transition-all duration-200"
			>
				<div className="text-amber-300 font-bold text-md text-center">
					Inventário de Cartas ({cards.length})
				</div>
			</button>

			{isOpen && (
				<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setIsOpen(false)}>
					<div
						className="bg-gradient-to-br from-amber-900/95 to-amber-950/95 border-2 border-amber-400/50 rounded-xl shadow-[0_8px_24px_rgba(251,191,36,0.4)] p-6 max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-amber-300 font-bold text-2xl">
								Inventário de Cartas ({cards.length})
							</h2>
							<button
								onClick={() => setIsOpen(false)}
								className="text-white hover:text-amber-300 text-2xl font-bold transition-colors"
							>
								×
							</button>
						</div>

						{cards.length === 0 ? (
							<div className="text-white text-center py-8">
								Você não possui cartas no momento
							</div>
						) : (
							<>
								<div className="grid grid-cols-3 gap-2 mb-4">
									{cards.map((card, index) => {
										const isSelected = selectedCardNames.includes(card.TerritoryName);
										const isDisabled = selectedShape !== null && selectedShape !== card.Shape && !isSelected;

										return (
											<TerritoryCard
												key={index}
												card={card}
												isSelected={isSelected}
												isDisabled={isDisabled}
												onSelect={() => handleCardSelect(index)}
											/>
										);
									})}
								</div>
								<button
									onClick={handleTrade}
									disabled={!canTrade}
									className={`w-full p-3 rounded-lg font-bold text-lg transition-all duration-200 ${
										canTrade
											? 'bg-gradient-to-br from-green-600 to-green-700 text-white cursor-pointer hover:from-green-500 hover:to-green-600 shadow-lg'
											: 'bg-gray-700/50 text-gray-400 cursor-not-allowed opacity-50'
									}`}
								>
									{canTrade ? 'Trocar Cartas (3)' : `Selecione 3 cartas (${selectedCardNames.length}/3)`}
								</button>
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default CardsModal;
