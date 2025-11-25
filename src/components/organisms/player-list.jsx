import React from 'react';

const PlayerList = ({ players, playerId }) => {
    return (
        <ul className="space-y-2 mb-8">
            {players.map((player) => (
                <li
                    key={player.id}
                    className={`p-4 border rounded-lg flex justify-between items-center transition-colors ${player.ready
                            ? 'bg-green-50 border-green-300'
                            : 'bg-gray-50 border-gray-300'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <span className={`text-lg ${player.is_owner ? 'font-bold' : 'font-normal'} text-gray-800`}>
                            {player.name}
                        </span>
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: player.color }}
                        ></div>
                    </div>
                    <span className={`text-sm font-bold ${player.ready ? 'text-green-600' : 'text-gray-400'}`}>
                        {player.ready && '✓ Pronto'}
                    </span>
                </li>
            ))}

            {[...Array(6 - players.length)].map((_, idx) => (
                <li
                    key={`empty-${idx}`}
                    className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50/30 text-gray-400 text-lg"
                >
                    Vazio
                </li>
            ))}
        </ul>
    );
};

export default PlayerList;
