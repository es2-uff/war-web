import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import AppService from '../services/app.service';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Room = () => {
	const query = useQuery();
	const history = useHistory();
	const ws = useRef(null);
	const isTransitioning = useRef(false);
	const [gameState, setGameState] = useState(null);
	const [connected, setConnected] = useState(false);
	const [myReady, setMyReady] = useState(false);

	const roomId = query.get('room_id');
	const ownerId = query.get('owner_id');
	const isHost = query.get('host') === 'true';
	const roomName = query.get('sala') || 'Lobby';
	const username = localStorage.getItem('player_name') || 'Guest';

	useEffect(() => {
		if (!roomId || !username) {
			history.push('/play-options');
			return;
		}

		ws.current = AppService.connectToRoomWebSocket(roomId, username, isHost, ownerId);

		ws.current.onopen = () => {
			console.log('Connected to WebSocket');
			setConnected(true);
		};

		ws.current.onmessage = (event) => {
			try {
				const messages = event.data.split('\n').filter(m => m.trim());

				messages.forEach(msgStr => {
					try {
						const message = JSON.parse(msgStr);
						console.log('Received message:', message);

						if (message.type === 'update') {
							setGameState(message.gameState);
						} else if (message.type === 'lobby_closed') {
							alert(message.message);
							history.push('/play-options');
						} else if (message.type === 'game_started') {
							console.log('Game started! Redirecting to game...');
							isTransitioning.current = true;
							setTimeout(() => {
								const gameUrl = `/game?room_id=${roomId}${isHost ? `&owner_id=${ownerId}` : ''}&host=${isHost}`;
								history.push(gameUrl);
							}, 100);
						}
					} catch (parseError) {
						console.error('Error parsing individual message:', parseError, msgStr);
					}
				});
			} catch (error) {
				console.error('Error processing WebSocket message:', error, event.data);
			}
		};

		ws.current.onerror = (error) => {
			console.error('WebSocket error:', error);
		};

		ws.current.onclose = () => {
			console.log('Disconnected from WebSocket');
			setConnected(false);
		};

		return () => {
			if (ws.current && !isTransitioning.current) {
				ws.current.close();
			}
		};
	}, [roomId, username, isHost, ownerId, history]);

	const toggleReady = () => {
		if (!gameState || !ws.current) return;

		const myId = Object.keys(gameState.players).find(
			id => gameState.players[id].username === username
		);

		if (myId) {
			const newReady = !myReady;
			setMyReady(newReady);
			AppService.sendPlayerReady(ws.current, myId, newReady);
		}
	};

	const startGame = () => {
		if (!gameState || !ws.current || !isHost) return;

		const myId = Object.keys(gameState.players).find(
			id => gameState.players[id].username === username
		);

		if (myId) {
			AppService.sendStartGame(ws.current, myId);
		}
	};

	if (!connected || !gameState) {
		return (
			<div className="min-h-screen w-full flex items-center justify-center p-4 bg-blue-100">
				<div className="p-10 rounded-2xl shadow-2xl bg-white max-w-lg mx-auto text-center">
					<h2 className="text-2xl font-bold text-gray-800">Connecting to lobby...</h2>
				</div>
			</div>
		);
	}

	const players = Object.values(gameState.players);
	const allReady = players.length >= 3 && players.every(p => p.is_ready);
	const canStart = isHost && allReady;

	return (
		<div className="min-h-screen w-full flex items-center justify-center p-4 bg-blue-100">
			<div className="p-10 rounded-2xl shadow-2xl bg-white max-w-2xl w-full mx-auto">
				<h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Sala de Espera</h1>

				<ul className="space-y-2 mb-8">
					{players.map((player) => (
						<li
							key={player.id}
							className={`p-4 border rounded-lg flex justify-between items-center transition-colors ${
								player.is_ready
								? 'bg-green-50 border-green-300'
								: 'bg-gray-50 border-gray-300'
								}`}
							>
							<div className="flex items-center gap-2">
								<span className={`text-lg ${player.is_owner ? 'font-bold' : 'font-normal'} text-gray-800`}>
									{player.username}
								</span>
								<div
									className="w-3 h-3 rounded-full"
									style={{ backgroundColor: player.color }}
								></div>
							</div>
							<span className={`text-sm font-bold ${player.is_ready ? 'text-green-600' : 'text-gray-400'}`}>
								{player.is_ready && '✓ Pronto'}
							</span>
						</li>
					))}

					{[...Array(6 - players.length)].map((_, idx) => (
						<li
							key={`empty-${idx}`}
							className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50/30 text-gray-400 text-lg"
						>
							Vazio
						</li>
					))}
				</ul>

				<button
					onClick={toggleReady}
					className={`w-full py-3 px-4 rounded-lg font-semibold text-white text-lg mb-2 transition-colors ${
						myReady
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
						className={`w-full py-3 px-4 rounded-lg font-semibold text-white text-lg mb-2 transition-colors ${
							canStart
							? 'bg-red-600 hover:bg-red-700'
							: 'bg-gray-400 cursor-not-allowed'
							}`}
						>
						{canStart ? 'Começar' : `Todos os jogadores devem estar prontos para iniciar... (${players.filter(p => p.is_ready).length}/${players.length})`}
					</button>
				)}
			</div>
		</div>
	);
};

export default Room;
