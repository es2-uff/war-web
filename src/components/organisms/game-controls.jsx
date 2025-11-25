import React from 'react';
import DistributeTroops from '../molecules/distribute-troops';
import MoveTroops from '../molecules/move-troops';
import AttackControl from '../molecules/attack-control';
import TradeCards from '../molecules/trade-cards';

const GameControls = ({ selectedTerritory, territories, expandedSection, setExpandedSection }) => {
	return (
		<div className="w-2/12 h-screen overflow-y-auto p-4 bg-gradient-to-b from-[rgba(20,20,30,0.95)] to-[rgba(10,10,20,0.95)] border-l-2 border-[rgba(100,150,255,0.3)] shadow-[inset_5px_0_15px_rgba(0,0,0,0.3)]">
			<h2 className="text-white text-[1.1rem] mb-3.5">
				Controles
			</h2>

			<DistributeTroops
				selectedTerritory={selectedTerritory}
				territories={territories}
				isExpanded={expandedSection === 'distribute'}
				onToggle={() => setExpandedSection(expandedSection === 'distribute' ? null : 'distribute')}
			/>

			<MoveTroops
				selectedTerritory={selectedTerritory}
				territories={territories}
				isExpanded={expandedSection === 'move'}
				onToggle={() => setExpandedSection(expandedSection === 'move' ? null : 'move')}
			/>

			<AttackControl
				selectedTerritory={selectedTerritory}
				territories={territories}
				isExpanded={expandedSection === 'attack'}
				onToggle={() => setExpandedSection(expandedSection === 'attack' ? null : 'attack')}
			/>

			<TradeCards
				isExpanded={expandedSection === 'trade'}
				onToggle={() => setExpandedSection(expandedSection === 'trade' ? null : 'trade')}
			/>
		</div>
	);
};

export default GameControls;
