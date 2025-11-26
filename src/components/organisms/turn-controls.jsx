import React from 'react';
import TurnFinishButton from '../atoms/turn-finish-button';
import TurnAttackButton from '../atoms/turn-attack-button';
import TurnDeployButton from '../atoms/turn-deploy-button';
import TurnMoveButton from '../atoms/turn-move-button';

const TurnControls = ({  handleDeployTroops, handleFinishTurn, handleAttackTerritory, handleMoveTroops, turnState, isMyTurn }) => {

	return (
		<div className="absolute left-1/2 -translate-x-1/2 px-6 py-3 flex items-center justify-center bottom-38.5 gap-x-4 bg-gradient-to-b from-[rgba(20,20,30,0.95)] to-[rgba(10,10,20,0.95)] rounded-t-2xl">
			{isMyTurn || turnState === -1 ? (
				<>
					<TurnDeployButton turnState={turnState} />
					<TurnAttackButton handleAttackTerritory={handleAttackTerritory} turnState={turnState} />
					<TurnMoveButton handleMoveTroops={handleMoveTroops} turnState={turnState} />
					<TurnFinishButton handleFinishTurn={handleFinishTurn} turnState={turnState} />
				</>
			) : (
				<span className="text-white/50 text-sm">Aguardando turno...</span>
			)}
		</div>
	);
};

export default TurnControls;
