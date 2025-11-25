import React from 'react';

const ObjectiveInfo = ({ objectiveDesc }) => {

	return (
		<div className="mt-6 p-4 bg-gradient-to-br from-purple-900/40 to-purple-950/30 border-2 border-purple-400/50 rounded-xl shadow-[0_4px_12px_rgba(147,51,234,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]">
			<div className="text-purple-300 font-bold mb-2 text-sm">
				Objetivo:
			</div>
			<div className="text-white text-base font-semibold leading-relaxed">
				{ objectiveDesc }
			</div>
		</div>
	);
};

export default ObjectiveInfo;
