import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import AppService from '../services/app.service';
import PlayerList from './organisms/player-list';
import useRoomWebSocket from '../hooks/useRoomWebSocket';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Room = () => {
	const query = useQuery();

	const roomId = query.get('room_id');
	const userId = localStorage.getItem('player_id');
	const ownedRoomId = localStorage.getItem('owned_room_id');
	const isHost = ownedRoomId === roomId;

	const [playersList, setPlayersList] = useState([]);
	const [myReady, setMyReady] = useState(false);

	const { connected, ws } = useRoomWebSocket(roomId, userId, setPlayersList);

	const canStart = true;
	// const canStart = isHost && allReady;
	// const allReady = players.length >= 3 && players.every(p => p.is_ready);

	const toggleReady = () => {
		if (!ws.current) return;

		if (userId) {
			setMyReady(!myReady);
			AppService.sendPlayerReady(ws.current, userId, !myReady);
		}
	};

	const startGame = () => {
		if (!ws.current) return;
		AppService.sendStartGame(ws.current, userId);
	};

	if (!connected) {
		return (
			<div className="min-h-screen w-full flex items-center justify-center p-4 bg-blue-100">
				<div className="p-10 rounded-2xl shadow-2xl bg-white max-w-lg mx-auto text-center">
					<h2 className="text-2xl font-bold text-gray-800">Connecting to lobby...</h2>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen w-full flex items-center justify-center p-4 bg-blue-100">
			<div className="p-10 rounded-2xl shadow-2xl bg-white max-w-2xl w-full mx-auto">
				<h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Sala de Espera</h1>

				<PlayerList players={playersList} />

				<button
					onClick={toggleReady}
					className={`w-full py-3 px-4 rounded-lg font-semibold text-white text-lg mb-2 transition-colors ${myReady
						? 'bg-green-600 hover:bg-green-700'
						: 'bg-blue-600 hover:bg-blue-700'
						}`}
				>
					{myReady ? 'Esperando outros jogadores...' : 'Pronto'}
				</button>

				{isHost && (
					<button
						onClick={startGame}
						disabled={!canStart}
						className={`w-full py-3 px-4 rounded-lg font-semibold text-white text-lg mb-2 transition-colors ${canStart
							? 'bg-red-600 hover:bg-red-700'
							: 'bg-gray-400 cursor-not-allowed'
							}`}
					>
						{canStart ?
							'Começar' :
							`Todos os jogadores devem estar prontos para iniciar... (${players.filter(p => p.ready).length}/${players.length})`}
					</button>
				)}
			</div>
		</div>
	);
};

export default Room;
