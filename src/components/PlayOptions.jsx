import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppService from '../services/app.service';

const PlayOptions = () => {
	const history = useHistory();
	const [rooms, setRooms] = useState([]);
	const [loading, setLoading] = useState(false);
	const [roomName, setRoomName] = useState('');
	const [showCreateInput, setShowCreateInput] = useState(false);
	const username = localStorage.getItem('player_name') || 'Guest';

	useEffect(() => {
		fetchRooms();
		const interval = setInterval(fetchRooms, 3000);
		return () => clearInterval(interval);
	}, []);

	const fetchRooms = async () => {
		try {
			const data = await AppService.GetAllRooms();
			setRooms(data || []);
		} catch (error) {
			console.error('Error fetching rooms:', error);
			setRooms([]);
		}
	};

	const createRoom = async () => {
		if (!roomName.trim()) {
			setShowCreateInput(true);
			return;
		}

		setLoading(true);
		try {
			const playerId = localStorage.getItem('player_id');
			if (!playerId) {
				alert('Player ID not found. Please refresh and try again.');
				return;
			}
			const room = await AppService.CreateRoom(roomName.trim(), playerId);
			history.push(`/sala?room_id=${room.room_id}&owner_id=${playerId}&host=true`);
		} catch (error) {
			console.error('Error creating room:', error);
			alert('Failed to create room. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const joinRoom = (room) => {
		history.push(`/sala?room_id=${room.room_id}&sala=${encodeURIComponent(room.room_name)}&host=false`);
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center p-4 bg-blue-100">
			<div className="p-10 gap-y-4 rounded-2xl shadow-2xl flex flex-col justify-center items-center bg-white">
				<h1 className="text-5xl font-bold">ES2 - WAR</h1>

					{/* Host Game Section */}
					<div className="w-full flex justify-center items-center gap-x-3">
						<h2 className="text-2xl font-semibold">Nova Sala</h2>
						<input
							type="text"
							placeholder="Nome da sala"
							onChange={(e) => setRoomName(e.target.value)}
							className="w-6/12 px-4 py-2 rounded-lg border-2 border-red-500 bg-white/90"
						/>
						<button
							className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg"
							onClick={createRoom}
							disabled={loading}
						>
							{loading ? '...' : '>'}
						</button>
					</div>

					<hr className="w-full border-t-2 border-gray-300 my-2"/>

					{/* Join Session Section */}
					<div className="flex flex-col items-center w-full">
						<h2 className="text-2xl font-semibold mb-6">Salas Disponiveis</h2>
						<div className="w-full overflow-y-auto pr-2" >
							{rooms.length === 0 ? (
								<p className="text-gray-400 text-center">Nenhuma sala disponível</p>
							) : (
								<ul className="space-y-4 w-full">
									{rooms.map((room) => (
										<li 
											key={room.room_id} 
											className="w-full p-4 border border-gray-300/20 rounded-lg flex justify-between items-center bg-white/10 hover:bg-white/15" 
										>
											<div>
												<div className="font-bold text-lg">{room.room_name}</div>
												<div className="text-gray-600 text-sm">
													Host: {room.owner_name}
												</div>
											</div>
											<button
												className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
												onClick={() => joinRoom(room)}
											>
												Entrar
											</button>
										</li>
									))}
								</ul>
							)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlayOptions;
