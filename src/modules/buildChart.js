import { csv } from 'https://cdn.skypack.dev/d3@7';
import { BarChart } from './BarChart.js';

export function buildChart(path) {
	return csv(path)
		.then((data) => {
			const newData = data.map((data) => ({
				date: new Date(data.Date).getFullYear(),
				price: parseFloat(data.Close),
			}));
			return newData;
		})
		.then((parsed) => {
			BarChart(parsed);
		});
}
