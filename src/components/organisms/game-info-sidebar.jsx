import React from 'react';
import PlayersList from '../molecules/players-list';
import CurrentTurnInfo from '../molecules/current-turn-info';
import GamePhaseInfo from '../molecules/game-phase-info';
import ObjectiveInfo from '../molecules/objective-info';

const GameInfoSidebar = ({ userId, players, gameState, phaseTranslations }) => {
	return (
		<div style={{
			background: 'linear-gradient(180deg, rgba(20,20,30,0.95) 0%, rgba(10,10,20,0.95) 100%)',
			padding: '1.5rem',
			overflowY: 'auto',
			borderRight: '2px solid rgba(100,150,255,0.3)',
			boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.3)',
			height: '100vh'
		}}>
			<PlayersList
				players={players}
				currentTurn={gameState.current_turn}
			/>

			<CurrentTurnInfo
				players={gameState.players}
				currentTurn={gameState.current_turn}
			/>

			<GamePhaseInfo
				phase={gameState.phase}
				phaseTranslations={phaseTranslations}
			/>

			<ObjectiveInfo 
				objectiveDesc={(gameState.players[userId]).objective_desc}
			/>
		</div>
	);
};

export default GameInfoSidebar;
