import axios from 'axios'
import { API_URL } from '../App'

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
}

export default new AppService()
