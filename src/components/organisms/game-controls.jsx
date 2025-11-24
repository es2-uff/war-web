import React from 'react';
import DistributeTroops from '../molecules/distribute-troops';
import MoveTroops from '../molecules/move-troops';
import AttackControl from '../molecules/attack-control';
import TradeCards from '../molecules/trade-cards';

const GameControls = ({ selectedTerritory, territories, expandedSection, setExpandedSection }) => {
	return (
		<div style={{
			background: 'linear-gradient(180deg, rgba(20,20,30,0.95) 0%, rgba(10,10,20,0.95) 100%)',
			padding: '1rem',
			overflowY: 'auto',
			borderLeft: '2px solid rgba(100,150,255,0.3)',
			boxShadow: 'inset 5px 0 15px rgba(0,0,0,0.3)',
			height: '100vh'
		}}>
			<h2 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.8rem' }}>
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
