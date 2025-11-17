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
}

export default new AppService()
