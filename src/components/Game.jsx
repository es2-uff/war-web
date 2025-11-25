import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import AppService from '../services/app.service';
import useGameWebSocket from '../hooks/useGameWebSocket';
import GameMap from './organisms/game-map';
import GameControls from './organisms/game-controls';
import GameInfoSidebar from './organisms/game-info-sidebar';
import GameLog from './organisms/game-log';
import { getTerritories } from '../data/territories';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const phaseTranslations = {
	'waiting': 'aguardando',
	'deploy': 'distribuir tropas',
	'attack': 'atacar',
	'move': 'mover tropas',
	'fortify': 'fortificar'
};

const Game = () => {
	const query = useQuery();
	const roomId = query.get('room_id');
	const userId = localStorage.getItem('player_id');

	// Game States
	const [gameState, setGameState] = useState(null);
	const [selectedTerritory, setSelectedTerritory] = useState(null);
	const [expandedSection, setExpandedSection] = useState(null);

	const { connected, ws } = useGameWebSocket(roomId, userId, setGameState);

	const handleTerritoryClick = (territoryId) => {
		console.log('Territory clicked:', territoryId);
		setSelectedTerritory(territoryId);
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
	const territories = getTerritories(playerIds);

	return (
		<div className="w-full flex h-screen p-0 overflow-hidden">
			<GameInfoSidebar
				userId={userId}
				players={players}
				gameState={gameState}
				phaseTranslations={phaseTranslations}
			/>

			<div className="w-8/12 h-full">
				<GameMap
					gameState={gameState}
					selectedTerritory={selectedTerritory}
					onTerritoryClick={handleTerritoryClick}
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
