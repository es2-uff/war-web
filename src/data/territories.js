export const getTerritories = (playerIds) => {
	const numPlayers = playerIds.length;

	return [
		{ id: 0, name: 'Roraima', x: 24.3, y: 24.4, owner: playerIds[0 % numPlayers], troops: 3 },
		{ id: 1, name: 'Amapá', x: 32.7, y: 9.6, owner: playerIds[1 % numPlayers], troops: 5 },
		{ id: 2, name: 'Amazonas', x: 9.1, y: 37.6, owner: playerIds[2 % numPlayers], troops: 2 },
		{ id: 3, name: 'Pará', x: 28.1, y: 42.2, owner: playerIds[3 % numPlayers], troops: 4 },
		{ id: 4, name: 'Tocantins', x: 53.5, y: 27.4, owner: playerIds[4 % numPlayers], troops: 7 },
		{ id: 5, name: 'Maranhão', x: 56.1, y: 10.6, owner: playerIds[5 % numPlayers], troops: 3 },
		{ id: 6, name: 'Goiás', x: 73.1, y: 27.2, owner: playerIds[6 % numPlayers], troops: 4 },
		{ id: 7, name: 'Mato Grosso', x: 64.5, y: 40.2, owner: playerIds[7 % numPlayers], troops: 6 },
		{ id: 8, name: 'Rondônia', x: 46.3, y: 47.0, owner: playerIds[8 % numPlayers], troops: 4 },
		{ id: 9, name: 'Acre', x: 48.1, y: 65.0, owner: playerIds[9 % numPlayers], troops: 8 },
		{ id: 10, name: 'Mato Grosso do Sul', x: 60.1, y: 55.4, owner: playerIds[10 % numPlayers], troops: 2 },
		{ id: 11, name: 'São Paulo', x: 63.1, y: 70.2, owner: playerIds[11 % numPlayers], troops: 5 },
		{ id: 12, name: 'Paraná', x: 56.1, y: 76.2, owner: playerIds[12 % numPlayers], troops: 3 },
		{ id: 13, name: 'Santa Catarina', x: 59.7, y: 83.0, owner: playerIds[13 % numPlayers], troops: 3 },
		{ id: 14, name: 'Rio Grande do Sul', x: 52.1, y: 88.6, owner: playerIds[14 % numPlayers], troops: 9 },
		{ id: 15, name: 'Rio de Janeiro', x: 81.1, y: 73.8, owner: playerIds[15 % numPlayers], troops: 4 },
		{ id: 16, name: 'Espírito Santo', x: 87.3, y: 65.8, owner: playerIds[16 % numPlayers], troops: 2 },
		{ id: 17, name: 'Minas Gerais', x: 73.7, y: 62.8, owner: playerIds[17 % numPlayers], troops: 5 },
		{ id: 18, name: 'Bahia', x: 79.9, y: 45.6, owner: playerIds[18 % numPlayers], troops: 6 },
		{ id: 19, name: 'Sergipe', x: 94.1, y: 45.4, owner: playerIds[19 % numPlayers], troops: 3 },
		{ id: 20, name: 'Alagoas', x: 97.3, y: 41.6, owner: playerIds[20 % numPlayers], troops: 5 },
		{ id: 21, name: 'Pernambuco', x: 90.3, y: 35.8, owner: playerIds[21 % numPlayers], troops: 7 },
		{ id: 22, name: 'Paraíba', x: 95.7, y: 33.2, owner: playerIds[22 % numPlayers], troops: 4 },
		{ id: 23, name: 'Rio Grande do Norte', x: 94.7, y: 29.8, owner: playerIds[23 % numPlayers], troops: 2 },
		{ id: 24, name: 'Ceará', x: 86.7, y: 27.4, owner: playerIds[24 % numPlayers], troops: 8 },
		{ id: 25, name: 'Piauí', x: 78.9, y: 34.2, owner: playerIds[25 % numPlayers], troops: 4 },
	];
};
