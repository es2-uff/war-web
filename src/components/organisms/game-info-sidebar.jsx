import React from 'react';
import PlayersList from '../molecules/players-list';
import ObjectiveInfo from '../molecules/objective-info';

const GameInfoSidebar = ({ userId, players, gameState, phaseTranslations }) => {
	return (
		<div className="w-2/12 h-screen overflow-y-auto p-6 bg-gradient-to-b from-[rgba(20,20,30,0.95)] to-[rgba(10,10,20,0.95)] border-r-2 border-[rgba(100,150,255,0.3)] shadow-[inset_-5px_0_15px_rgba(0,0,0,0.3)]">
			<PlayersList
				userId={userId}
				players={players}
				currentTurn={gameState.current_turn}
			/>

			<ObjectiveInfo 
				objectiveDesc={(gameState.players[userId]).objective_desc}
			/>
		</div>
	);
};

export default GameInfoSidebar;
