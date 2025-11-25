import React from 'react';

const GameLog = () => {
	// Mock log entries - simple text lines
	const logLines = [
		'[14:23:15] Jogador 1 atacou Brasil a partir de Argentina',
		'[14:23:16] Jogador 2 defendeu Brasil com sucesso',
		'[14:23:18] Jogador 1 conquistou Brasil',
		'[14:23:20] Jogador 1 moveu 3 tropas de Argentina para Brasil',
		'[14:23:25] Jogador 3 distribuiu 5 tropas em China',
		'[14:23:30] Jogador 3 atacou Índia a partir de China',
		'[14:23:35] Jogador 2 trocou cartas e recebeu 4 tropas',
		'[14:23:40] Jogador 1 eliminou Jogador 4 do jogo',
	];

	return (
		<div className="h-1/5 p-4 bg-gradient-to-b from-[rgba(20,20,30,0.95)] to-[rgba(10,10,20,0.95)] border-l-2 border-[rgba(100,150,255,0.3)] shadow-[inset_5px_0_15px_rgba(0,0,0,0.3)]">
			<h2 className="text-white text-[1.1rem] mb-3.5">
				Registro do Jogo
			</h2>

			<div className="font-mono text-sm text-gray-300 space-y-1">
				{logLines.map((line, index) => (
					<div key={index}>
						{line}
					</div>
				))}
			</div>
		</div>
	);
};

export default GameLog;
