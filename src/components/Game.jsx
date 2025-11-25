import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import AppService from '../services/app.service';
import useGameWebSocket from '../hooks/useGameWebSocket';
import GameMap from './organisms/game-map';
import GameControls from './organisms/game-controls';
import TurnControls from './organisms/turn-controls';
import GameInfoSidebar from './organisms/game-info-sidebar';
import GameLog from './organisms/game-log';
import { getTerritories } from '../data/territories';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Game = () => {
	const query = useQuery();
	const roomId = query.get('room_id');
	const userId = localStorage.getItem('player_id');

	// Game States
	const [gameState, setGameState] = useState(null);

	// Turn 0: Deploy | Turn 1: Attack | Turn 2: Move | Turn 3: Finish
	const [turnState, setTurnState] = useState(0);

	const [currentTurn, setCurrentTurn] = useState(null);
	const [selectedTerritory, setSelectedTerritory] = useState(null);
	const [expandedSection, setExpandedSection] = useState(null);

	const { connected, ws } = useGameWebSocket(roomId, userId, setGameState);

	useEffect(() => {
		if (gameState != null && currentTurn != gameState.current_turn) {
			setCurrentTurn(gameState.current_turn);
			setTurnState(0);
		}
	}, [gameState]);

	const handleTerritoryClick = (territory) => {
		setSelectedTerritory(territory);
	};

	const handleDeployTroops = () => {
		setTurnState(1)
	};

	const  handleAttackTerritory = () => {
		setTurnState(2)
	};

	const  handleMoveTroops = () => {
		setTurnState(3)
	};

	const handleFinishTurn = async (territory) => {
		if (!ws.current) return;
		await AppService.sendFinishTurn(ws.current, userId)
	};

	if (!gameState || !connected) {
		return (
			<div className="landing-container">
				<div className="content-box max-w-[600px] mx-auto text-center">
					<h2 className="text-white">Carregando jogo...</h2>
				</div>
			</div>
		);
	}

	const players = Object.values(gameState.players);
	const playerIds = Object.keys(gameState.players);
	const territories = getTerritories(gameState.territories);

	return (
		<div className="w-full flex h-screen p-0 overflow-hidden">
			<GameInfoSidebar
				userId={userId}
				players={players}
				gameState={gameState}
			/>

			<div className="relative w-8/12 h-full">
				<GameMap
					territories={territories}
					selectedTerritory={selectedTerritory}
					onTerritoryClick={handleTerritoryClick}
				/>

				<TurnControls 
					turnState={turnState}
					handleDeployTroops={handleDeployTroops}
					handleAttackTerritory={handleAttackTerritory}
					handleMoveTroops={handleMoveTroops}
					isMyTurn={currentTurn === userId}
					handleFinishTurn={handleFinishTurn}
				/>

				<GameLog />
			</div>

			<GameControls
				selectedTerritory={selectedTerritory}
				territories={territories}
				expandedSection={expandedSection}
				setExpandedSection={setExpandedSection}
			/>
		</div>
	);
};

export default Game;
