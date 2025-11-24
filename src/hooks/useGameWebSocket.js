import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AppService from '../services/app.service';

const useGameWebSocket = (roomId, userId, setGameStateFunc) => {
	const history = useHistory();
	const ws = useRef(null);
	const isMountedRef = useRef(true);

	const [gameState, setGameState] = useState(null);
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		if (!roomId || !userId) {
			history.push('/play-options');
			return;
		}

		ws.current = AppService.connectToGameWebSocket(roomId, userId);

		ws.current.onopen = () => {
			console.log('Connected to Game WebSocket');
			setConnected(true);
		};

		ws.current.onmessage = (event) => {
			try {
				const message = JSON.parse(event.data);

				console.log(message);

				if (message.type === 'update') {
					if (isMountedRef.current) {
						setGameStateFunc(message.gameState);
					}
				} else if (message.type === 'game_started') {
					ws.current.close();
					history.push(`/`);
				}
			} catch (parseError) {
				console.error('Error parsing message:', parseError);
			}
		};

		ws.current.onerror = (error) => {
			console.error('WebSocket error:', error);
		};

		ws.current.onclose = () => {
			if (isMountedRef.current) {
				setConnected(false);
			}
		};

		return () => {
			isMountedRef.current = false;
			if (ws.current) {
				ws.current.close();
			}
		};
	}, []);

	return { connected, ws };
};

export default useGameWebSocket;
