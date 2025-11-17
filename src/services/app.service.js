import axios from 'axios'
import { API_URL } from '../App'

const WS_URL = 'ws://localhost:8080/ws'

class AppService {
	getCurrentUser() {
		return JSON.parse(localStorage.getItem('user'))
	}

	async CreatePlayer(username) {
		return await axios
			.post(API_URL + '/players/new', { player_name: username })
			.then((resp) => resp.data)
			.catch((err) => {
				throw err
			})
	}

	async GetAllRooms() {
		return await axios
			.get(API_URL + '/rooms/all')
			.then((resp) => resp.data)
			.catch((err) => {
				throw err
			})
	}

	async CreateRoom(roomName, ownerId) {
		return await axios
			.post(API_URL + '/rooms/new', { room_name: roomName, owner_id: ownerId })
			.then((resp) => resp.data)
			.catch((err) => {
				throw err
			})
	}

	async JoinRoom(roomId, playerId) {
		return await axios
			.post(API_URL + '/rooms/join', { room_id: roomId, player_id: playerId })
			.then((resp) => resp.data)
			.catch((err) => {
				throw err
			})
	}

	connectToRoomWebSocket(roomId, username, isHost, ownerId) {
		const wsUrl = `${WS_URL}?room_id=${roomId}&username=${encodeURIComponent(username)}${isHost && ownerId ? `&owner_id=${ownerId}` : ''}`
		return new WebSocket(wsUrl)
	}

	sendPlayerReady(ws, playerId, ready) {
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify({
				type: 'player_ready',
				player_id: playerId,
				ready: ready
			}))
		}
	}

	sendStartGame(ws, playerId) {
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify({
				type: 'start_game',
				player_id: playerId
			}))
		}
	}
}

export default new AppService()
