import axios from 'axios'
import { API_URL } from '../App'

const ROOM_WS_URL = 'ws://localhost:8080/api/v1/rooms/ws'
const GAME_WS_URL = 'ws://localhost:8080/api/v1/games/ws'

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

	connectToRoomWebSocket(roomId, userId) {
		const wsUrl = `${ROOM_WS_URL}?room_id=${roomId}&user_id=${userId}`
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
		ws.send(JSON.stringify({
			type: 'start_game',
			player_id: playerId
		}))
	}

	connectToGameWebSocket(roomId, userId) {
		const wsUrl = `${GAME_WS_URL}?room_id=${roomId}&user_id=${userId}`
		return new WebSocket(wsUrl)
	}

	async sendFinishTurn(ws, playerId) {
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify({
				type: 'finish_turn',
				player_id: playerId,
			}))
		}
	}

	async sendFinishInitialDeployment(ws, playerId) {
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify({
				type: 'finish_initial_deployment',
				player_id: playerId,
			}))
		}
	}

	async sendTroopAssign(ws, playerId, territoryId) {
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify({
				type: 'troop_assign',
				player_id: playerId,
				territory_id: territoryId,
			}))
		}
	}

	async sendAttackTerritory(ws, playerId, fromId, toId, attackingArmies) {
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify({
				type: 'attack',
				player_id: playerId,
				from: fromId,
				to: toId,
				attacking_armies: attackingArmies,
			}))
		}
	}
}

export default new AppService()
