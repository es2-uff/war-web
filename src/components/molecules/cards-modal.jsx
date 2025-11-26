import React, { useState } from 'react';

const CardsModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="w-full mt-6 p-4 bg-gradient-to-br from-amber-900/40 to-amber-950/30 border-2 border-amber-400/50 rounded-xl shadow-[0_4px_12px_rgba(251,191,36,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] cursor-pointer hover:from-amber-800/50 hover:to-amber-900/40 transition-all duration-200"
			>
				<div className="text-amber-300 font-bold text-md text-center">
					Inventário de Cartas
				</div>
			</button>

			{isOpen && (
				<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setIsOpen(false)}>
					<div
						className="bg-gradient-to-br from-amber-900/95 to-amber-950/95 border-2 border-amber-400/50 rounded-xl shadow-[0_8px_24px_rgba(251,191,36,0.4)] p-6 max-w-2xl w-full mx-4"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-amber-300 font-bold text-2xl">
								Inventário de Cartas
							</h2>
							<button
								onClick={() => setIsOpen(false)}
								className="text-white hover:text-amber-300 text-2xl font-bold transition-colors"
							>
								×
							</button>
						</div>

						<div className="text-white text-center py-8">
							{/* TODO: Implement cards display */}
							Você não possui cartas no momento
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CardsModal;
