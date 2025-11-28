const rawCoords = {
	'Argélia': { x: 828, y: 574 },
	'Egito': { x: 1009, y: 510 },
	'Sudão': { x: 1105, y: 631 },
	'Congo': { x: 973, y: 743 },
	'África do Sul': { x: 1000, y: 834 },
	'Madagascar': { x: 1170, y: 802 },

	'Inglaterra': { x: 700, y: 278 },
	'Islândia': { x: 790, y: 222 },
	'Suécia': { x: 935, y: 186 },
	'Moscou': { x: 1108, y: 295 },
	'Alemanha': { x: 924, y: 317 },
	'Polônia': { x: 1005, y: 378 },
	'Portugal': { x: 835, y: 345 },

	'Oriente Médio': { x: 1165, y: 510 },
	'Índia': { x: 1400, y: 548 },
	'Vietnã': { x: 1576, y: 618 },
	'China': { x: 1570, y: 480 },
	'Aral': { x: 1260, y: 392 },
	'Omsk': { x: 1260, y: 280 },
	'Dudinka': { x: 1308, y: 165 },
	'Sibéria': { x: 1435, y: 214 },
	'Tchita': { x: 1474, y: 305 },
	'Mongólia': { x: 1500, y: 384 },
	'Japão': { x: 1850, y: 440 },
	'Vladivostok': { x: 1671, y: 260 },

	'Austrália': { x: 1650, y: 860 },
	'Nova Guiné': { x: 1827, y: 736 },
	'Sumatra': { x: 1530, y: 760 },
	'Bornéu': { x: 1655, y: 740 },

	'Brasil': { x: 480, y: 757 },
	'Argentina': { x: 384, y: 871 },
	'Chile': { x: 354, y: 777 },
	'Colômbia': { x: 339, y: 562 },

	'México': { x: 168, y: 464 },
	'Califórnia': { x: 117, y: 342 },
	'Nova York': { x: 306, y: 355 },
	'Labrador': { x: 477, y: 296 },
	'Ottawa': { x: 352, y: 243 },
	'Vancouver': { x: 198, y: 209 },
	'Mackenzie': { x: 287, y: 133 },
	'Alasca': { x: 172, y: 106 },
	'Groenlândia': { x: 656, y: 156 },
};

// These should match the dimensions of the image used to get the coordinates
const IMAGE_WIDTH = 1920;
const IMAGE_HEIGHT = 1080;

const pixelToPercent = (x, y) => ({
	x: (x / IMAGE_WIDTH) * 100,
	y: (y / IMAGE_HEIGHT) * 100
});

export const getTerritories = (gameStateTerritories) => {
	const territoriesMap = {};

	if(!gameStateTerritories){
		return territoriesMap;
	}

	for (const [name, coords] of Object.entries(rawCoords)) {
		const pos = pixelToPercent(coords.x, coords.y);
		const territoryData = gameStateTerritories.find(t => t.name === name);

		territoriesMap[name] = {
			...territoryData,
			name,
			x: pos.x,
			y: pos.y,
		};
	}

	return territoriesMap;
};
