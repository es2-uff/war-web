import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AppService from '../services/app.service';

const useRoomWebSocket = (roomId, userId, setPlayersListFunc) => {
	const history = useHistory();
	const ws = useRef(null);
	const isMountedRef = useRef(true);

	const [connected, setConnected] = useState(false);

	useEffect(() => {
		isMountedRef.current = true;

		if (!roomId || !userId) {
			history.push('/play-options');
			return;
		}

		ws.current = AppService.connectToRoomWebSocket(roomId, userId);

		ws.current.onopen = () => {
			console.log('Connected to Room WebSocket');
			if (isMountedRef.current) {
				setConnected(true);
			}
		};

		ws.current.onmessage = (event) => {
			try {
				const message = JSON.parse(event.data);

				if (message.type === 'room_update') {
					if (isMountedRef.current) {
						setPlayersListFunc(message.players);
					}
				} else if (message.type === 'game_started') {
					ws.current.close();
					history.push(`/game?room_id=${roomId}`);
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
			localStorage.removeItem('owned_room_id');
		};
	}, [roomId, userId, history]);

	return { connected, ws };
};

export default useRoomWebSocket;
