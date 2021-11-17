import { getData } from './modules/getData.js';
import { select } from 'https://cdn.skypack.dev/d3@7';

getData('/src/assets/cardano.csv');

select('#select-coin').on('change', (e) => {
	const path =
		e.target.value === 'BTC'
			? '/src/assets/bitcoin.csv'
			: '/src/assets/cardano.csv';
	getData(path);
});
