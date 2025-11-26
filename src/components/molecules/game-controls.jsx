import React from 'react';
import DistributeTroops from './distribute-troops';
import MoveTroops from './move-troops';
import AttackControl from './attack-control';
import TradeCards from './trade-cards';

const GameControls = ({ availableTroops, selectedTerritory, territories, turnState, isMyTurn, handleTroopAssign }) => {
	return (
		<div className="mt-6">
			<h2 className="text-white text-[1.1rem] mb-3.5">
				Controles
			</h2>

			{(isMyTurn || turnState === -1) ? (
				<>
					{(turnState === 0 || turnState === -1) && (
						<DistributeTroops
							handleTroopAssign={handleTroopAssign}
							availableTroops={availableTroops}
							selectedTerritory={selectedTerritory}
							territories={territories}
						/>
					)}

					{turnState === 1 && (
						<AttackControl
							selectedTerritory={selectedTerritory}
							territories={territories}
						/>
					)}

					{turnState === 2 && (
						<MoveTroops
							selectedTerritory={selectedTerritory}
							territories={territories}
						/>
					)}
				</>
			) : (
				<div className="text-white/50 text-sm text-center mt-4">
					Aguardando seu turno...
				</div>
			)}
		</div>
	);
};

export default GameControls;
