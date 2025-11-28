import React, { useEffect, useRef } from 'react';

const GameLog = ({ log }) => {
	const logEndRef = useRef(null);

	const formatTime = (timestamp) => {
		const date = new Date(timestamp);
		return date.toLocaleTimeString('pt-BR', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		});
	};

	const logEntries = log && Array.isArray(log) ? log : [];

	useEffect(() => {
		if (logEndRef.current) {
			logEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [logEntries]);

	return (
		<div className="h-1/5 p-4 bg-gradient-to-b from-[rgba(20,20,30,0.95)] to-[rgba(10,10,20,0.95)] border-l-2 border-[rgba(100,150,255,0.3)] shadow-[inset_5px_0_15px_rgba(0,0,0,0.3)]">
			<div className="font-mono text-sm text-gray-300 space-y-1 overflow-y-auto max-h-full">
				{logEntries.length === 0 ? (
					<div className="text-gray-500 italic">Nenhuma ação registrada ainda...</div>
				) : (
					logEntries.map((entry, index) => (
						<div key={index}>
							{entry.timestamp && entry.message && (
								<>
									<span className="text-blue-400">[{formatTime(entry.timestamp)}]</span>
									{' '}
									<span>{entry.message}</span>
								</>
							)}
						</div>
					))
				)}
				<div ref={logEndRef} />
			</div>
		</div>
	);
};

export default GameLog;
