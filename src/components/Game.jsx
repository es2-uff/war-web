import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import AppService from '../services/app.service';
import useGameWebSocket from '../hooks/useGameWebSocket';
import GameMap from './organisms/game-map';
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

	// Turn -1: All Deploy | Turn 0: Deploy | Turn 1: Attack | Turn 2: Move | Turn 3: Finish
	const [turnState, setTurnState] = useState(0);

	const [currentTurn, setCurrentTurn] = useState(null);

	const [territories, setTerritories] = useState(null);
	const [selectedTerritory, setSelectedTerritory] = useState(null);

	const { connected, ws } = useGameWebSocket(roomId, userId, setGameState);

	useEffect(() => {
		if (gameState != null){
			setTerritories(getTerritories(gameState.territories));

			if(currentTurn != gameState.current_turn) {
				setCurrentTurn(gameState.current_turn);
				setTurnState(0);
			}
		}
	}, [gameState, currentTurn]);

	const handleTerritoryClick = (territory) => {
		for (const [name, data] of Object.entries(territories)) {
			if(data.name == territory.name && data.owner == userId){
				setSelectedTerritory(territory);
				return;
			}
		}
		setSelectedTerritory(null);
	};

	const  handleSetAttackTurnState = () => {
		setTurnState(1)
	};

	const  handleSetMoveTurnState = () => {
		setTurnState(2)
	};

	const handleTroopAssign = async () => {
		if (!ws.current) return;
		console.log("dajdsksdj");
		await AppService.sendTroopAssign(ws.current, userId, selectedTerritory.id);
	};

	const handleAttackTerritory = async (from, to, attackingArmies) => {
		if (!ws.current) return;
		console.log("attack", from, to, attackingArmies)
		await AppService.sendAttackTerritory(ws.current, userId, from.id, to, attackingArmies);
	};

	const handleFinishTurn = async (territory) => {
		if (!ws.current) return;
		await AppService.sendFinishTurn(ws.current, userId);
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

	return (
		<div className="w-full flex h-screen p-0 overflow-hidden">
			<GameInfoSidebar
				userId={userId}
				players={players}
				gameState={gameState}
				selectedTerritory={selectedTerritory}
				territories={territories}
				turnState={turnState}
				isMyTurn={currentTurn === userId}
				handleTroopAssign={handleTroopAssign}
				handleAttackTerritory={handleAttackTerritory}
			/>

			<div className="relative w-9/12 h-full">
				<GameMap
					territories={territories}
					selectedTerritory={selectedTerritory}
					onTerritoryClick={handleTerritoryClick}
				/>

				<TurnControls
					turnState={turnState}
					handleSetAttackTurnState={handleSetAttackTurnState}
					handleSetMoveTurnState={handleSetMoveTurnState}
					isMyTurn={currentTurn === userId}
					handleFinishTurn={handleFinishTurn}
				/>

				<GameLog />
			</div>
		</div>
	);
};

export default Game;
