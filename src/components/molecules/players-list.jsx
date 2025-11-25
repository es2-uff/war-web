import React from 'react';

const PlayersList = ({ players, currentTurn, userId }) => {
	return (
		<div>
			<h2 className="text-white text-[1.3rem] mb-4">
				Jogadores ({players.length})
			</h2>
			<ul className="list-none p-0">
				{players.map((player) => (
					<li
						key={player.id}
						className={`
							mb-3 p-4 rounded-xl text-white transition-all duration-300
							${player.id === currentTurn
								? 'border-2 border-yellow-400/60 bg-gradient-to-br from-yellow-400/25 to-yellow-500/15 shadow-[0_4px_12px_rgba(255,215,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]'
								: 'border border-white/15 bg-gradient-to-br from-white/12 to-white/5 shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]'
							}
						`}
					>
						<div className="flex justify-between items-center">
							<span>
								{player.username}
								{player.id == userId && ' (Você)'}
							</span>
							<div
								className="w-[15px] h-[15px] rounded-full"
								style={{ background: player.color }}
							></div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PlayersList;
