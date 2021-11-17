import { buildChart } from './modules/buildChart.js';
import { select } from 'https://cdn.skypack.dev/d3@7';

buildChart('/src/assets/cardano.csv');

select('#selectCoin').on('change', (e) => {
	const path =
		e.target.value === 'BTC'
			? '/src/assets/bitcoin.csv'
			: '/src/assets/cardano.csv';
	buildChart(path);
});
