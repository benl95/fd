import { csv } from 'https://cdn.skypack.dev/d3@7';
import { drawBarChart } from './BarChart.js';

export function getData(path) {
	csv(path)
		.then((data) => {
			const newData = data.map((data) => ({
				date: new Date(data.Date).getFullYear(),
				price: parseFloat(data.Close),
			}));
			return newData;
		})
		.then((parsed) => {
			drawBarChart(parsed);
		});
}
