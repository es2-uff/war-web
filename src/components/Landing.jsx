import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import AppService from '../services/app.service';

const Landing = () => {
	const history = useHistory();
	const [username, setUsername] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handlePlay = async () => {
		if (!username.trim()) {
			setErrorMessage('Por favor, insira um nome de jogador');
			return;
		}

		try {
			const response = await AppService.CreatePlayer(username);
			localStorage.setItem('player_name', response.player_name);
			localStorage.setItem('player_id', response.player_id);
			history.push('/play-options');
		} catch (err) {
			console.error(err);
			setErrorMessage('Erro ao criar jogador. Tente novamente.');
		}
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center p-4 bg-blue-100">
			<div className="p-10 px-20 gap-y-4 rounded-2xl shadow-2xl flex flex-col justify-center items-center bg-white">
				<h1 className="text-5xl font-bold">ES2 - WAR</h1>
				<input
					placeholder="Nome do jogador"
					onChange={(e) => setUsername(e.target.value)}
					className="w-full px-4 py-3 text-lg rounded-lg border-2 border-red-500 bg-white/90 text-center"
				/>

				<button
					className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg"
					onClick={handlePlay}
				>
					JOGAR
				</button>

				{errorMessage != '' &&
					<span
						id="error-message"
						className="text-red-500 font-bold">
						{ errorMessage }
					</span>
				}
			</div>
		</div>
	);
};

export default Landing;
