import React from 'react';
import CreateRoom from './organisms/create-room';
import JoinRoom from './organisms/join-room';

const PlayOptions = () => {
	return (
		<div className="min-h-screen w-full flex items-center justify-center p-4 bg-blue-100">
			<div className="p-10 gap-y-4 rounded-2xl shadow-2xl flex flex-col justify-center items-center bg-white">
				<h1 className="text-5xl font-bold">ES2 - WAR</h1>

				<CreateRoom />

				<hr className="w-full border-t-2 border-gray-300 my-2" />

				<JoinRoom />
			</div>
		</div>
	);
};

export default PlayOptions;
