const rawCoords = {
	'Algeria': { x: 828, y: 574 },
	'Egypt': { x: 1009, y: 510 },
	'Sudan': { x: 1105, y: 631 },
	'Congo': { x: 973, y: 743 },
	'South Africa': { x: 1000, y: 834 },
	'Madagascar': { x: 1170, y: 802 },

	'England': { x: 700, y: 278 },
	'Iceland': { x: 790, y: 222 },
	'Sweden': { x: 935, y: 186 },
	'Moscow': { x: 1108, y: 295 },
	'Germany': { x: 924, y: 317 },
	'Poland': { x: 1005, y: 378 },
	'Portugal': { x: 835, y: 345 },

	'Middle East': { x: 1165, y: 510 },
	'India': { x: 1400, y: 548 },
	'Vietnam': { x: 1576, y: 618 },
	'China': { x: 1570, y: 480 },
	'Aral': { x: 1260, y: 392 },
	'Omsk': { x: 1260, y: 280 },
	'Dudinka': { x: 1308, y: 165 },
	'Siberia': { x: 1435, y: 214 },
	'Tchita': { x: 1474, y: 305 },
	'Mongolia': { x: 1500, y: 384 },
	'Japan': { x: 1850, y: 440 },
	'Vladivostok': { x: 1671, y: 260 },

	'Australia': { x: 1650, y: 860 },
	'New Guinea': { x: 1827, y: 736 },
	'Sumatra': { x: 1530, y: 760 },
	'Borneo': { x: 1655, y: 740 },

	'Brazil': { x: 480, y: 757 },
	'Argentina': { x: 384, y: 871 },
	'Chile': { x: 354, y: 777 },
	'Colombia': { x: 339, y: 562 },

	'Mexico': { x: 168, y: 464 },
	'California': { x: 117, y: 342 },
	'New York': { x: 306, y: 355 },
	'Labrador': { x: 477, y: 296 },
	'Ottawa': { x: 352, y: 243 },
	'Vancouver': { x: 198, y: 209 },
	'Mackenzie': { x: 287, y: 133 },
	'Alaska': { x: 172, y: 106 },
	'Greenland': { x: 656, y: 156 },
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
