export const getTerritories = (playerIds) => {
	const numPlayers = playerIds.length;

	// Image dimensions that match the coordinate system used when measuring points
	// Note: These should match the dimensions of the image you used to get the coordinates
	const IMAGE_WIDTH = 1920;
	const IMAGE_HEIGHT = 1080;

	// Raw pixel coordinates converted to percentages
	const pixelToPercent = (x, y) => ({
		x: (x / IMAGE_WIDTH) * 100,
		y: (y / IMAGE_HEIGHT) * 100
	});

	// Raw pixel coordinates
	const rawCoords = [
		{ id: 0, name: 'Algeria', x: 828, y: 574, owner: playerIds[0 % numPlayers], troops: 3 },
		{ id: 1, name: 'Egypt', x: 1009, y: 510, owner: playerIds[1 % numPlayers], troops: 5 },
		{ id: 2, name: 'Sudan', x: 1105, y: 631, owner: playerIds[2 % numPlayers], troops: 2 },
		{ id: 3, name: 'Congo', x: 973, y: 743, owner: playerIds[3 % numPlayers], troops: 4 },
		{ id: 4, name: 'South Africa', x: 1000, y: 834, owner: playerIds[4 % numPlayers], troops: 7 },
		{ id: 5, name: 'Madagascar', x: 1170, y: 802, owner: playerIds[5 % numPlayers], troops: 3 },

		{ id: 6, name: 'England', x: 700, y: 278, owner: playerIds[6 % numPlayers], troops: 4 },
		{ id: 7, name: 'Iceland', x: 790, y: 222, owner: playerIds[7 % numPlayers], troops: 6 },
		{ id: 8, name: 'Sweden', x: 935, y: 186, owner: playerIds[8 % numPlayers], troops: 4 },
		{ id: 9, name: 'Moscow', x: 1108, y: 295, owner: playerIds[9 % numPlayers], troops: 8 },
		{ id: 10, name: 'Germany', x: 924, y: 317, owner: playerIds[10 % numPlayers], troops: 2 },
		{ id: 11, name: 'Poland', x: 1005, y: 378, owner: playerIds[11 % numPlayers], troops: 5 },
		{ id: 12, name: 'Portugal', x: 835, y: 345, owner: playerIds[12 % numPlayers], troops: 3 },

		{ id: 13, name: 'Middle East', x: 1165, y: 510, owner: playerIds[13 % numPlayers], troops: 3 },
		{ id: 14, name: 'India', x: 1400, y: 548, owner: playerIds[14 % numPlayers], troops: 9 },
		{ id: 15, name: 'Vietnam', x: 1576, y: 618, owner: playerIds[15 % numPlayers], troops: 4 },
		{ id: 16, name: 'China', x: 1570, y: 480, owner: playerIds[16 % numPlayers], troops: 2 },
		{ id: 17, name: 'Aral', x: 1260, y: 392, owner: playerIds[17 % numPlayers], troops: 5 },
		{ id: 18, name: 'Omsk', x: 1260, y: 280, owner: playerIds[18 % numPlayers], troops: 6 },
		{ id: 19, name: 'Dudinka', x: 1308, y: 165, owner: playerIds[19 % numPlayers], troops: 3 },
		{ id: 20, name: 'Siberia', x: 1435, y: 214, owner: playerIds[20 % numPlayers], troops: 5 },
		{ id: 21, name: 'Tchita', x: 1474, y: 305, owner: playerIds[21 % numPlayers], troops: 7 },
		{ id: 22, name: 'Mongolia', x: 1500, y: 384, owner: playerIds[22 % numPlayers], troops: 4 },
		{ id: 23, name: 'Japan', x: 1850, y: 440, owner: playerIds[23 % numPlayers], troops: 2 },
		{ id: 24, name: 'Vladivostok', x: 1671, y: 260, owner: playerIds[24 % numPlayers], troops: 8 },
	
		{ id: 25, name: 'Australia', x: 1650, y: 860, owner: playerIds[25 % numPlayers], troops: 4 },
		{ id: 26, name: 'New Guinea', x: 1827, y: 736, owner: playerIds[26 % numPlayers], troops: 4 },
		{ id: 27, name: 'Sumatra', x: 1530, y: 760, owner: playerIds[27 % numPlayers], troops: 8 },
		{ id: 28, name: 'Borneo', x: 1655, y: 740, owner: playerIds[28 % numPlayers], troops: 4 },

		{ id: 29, name: 'Brazil', x: 480, y: 757, owner: playerIds[29 % numPlayers], troops: 3 },
		{ id: 30, name: 'Argentina', x: 384, y: 871, owner: playerIds[30 % numPlayers], troops: 5 },
		{ id: 31, name: 'Chile', x: 354, y: 777, owner: playerIds[31 % numPlayers], troops: 2 },
		{ id: 32, name: 'Colombia', x: 339, y: 562, owner: playerIds[32 % numPlayers], troops: 4 },

		{ id: 33, name: 'Mexico', x: 168, y: 464, owner: playerIds[33 % numPlayers], troops: 7 },
		{ id: 34, name: 'California', x: 117, y: 342, owner: playerIds[34 % numPlayers], troops: 3 },
		{ id: 35, name: 'New York', x: 306, y: 355, owner: playerIds[35 % numPlayers], troops: 4 },
		{ id: 36, name: 'Labrador', x: 477, y: 296, owner: playerIds[36 % numPlayers], troops: 6 },
		{ id: 37, name: 'Ottawa', x: 352, y: 243, owner: playerIds[37 % numPlayers], troops: 4 },
		{ id: 38, name: 'Vancouver', x: 198, y: 209, owner: playerIds[38 % numPlayers], troops: 8 },
		{ id: 39, name: 'Mackenzie', x: 287, y: 133, owner: playerIds[39 % numPlayers], troops: 2 },
		{ id: 40, name: 'Alaska', x: 172, y: 106, owner: playerIds[40 % numPlayers], troops: 5 },
		{ id: 41, name: 'Greenland', x: 656, y: 156, owner: playerIds[41 % numPlayers], troops: 3 },
	];

	// Convert raw pixel coordinates to percentages
	return rawCoords.map(territory => {
		const pos = pixelToPercent(territory.x, territory.y);
		return {
			...territory,
			x: pos.x,
			y: pos.y
		};
	});
};
