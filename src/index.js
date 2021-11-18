import { getData } from './modules/getData.js';
import { select } from 'https://cdn.skypack.dev/d3@7';

getData('./assets/cardano.csv');

select('#select-coin').on('change', (e) => {
    const path =
        e.target.value === 'BTC'
            ? './assets/cardano.csv'
            : './assets/bitcoin.csv';
    getData(path);
});
