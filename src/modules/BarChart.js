import {
	select,
	scaleLinear,
	max,
	scaleBand,
	axisLeft,
	axisBottom,
	format,
	transition,
} from 'https://cdn.skypack.dev/d3@7';

const svg = select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

const margin = {
	top: 50,
	right: 20,
	bottom: 70,
	left: 70,
};
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const xScale = scaleLinear().range([0, innerWidth]);
const yScale = scaleBand().range([0, innerHeight]).padding(0.1);
const xAxis = axisBottom(xScale);
const yAxis = axisLeft(yScale);

const chart = svg
	.append('g')
	.attr('transform', `translate(${margin.left}, ${margin.top})`)
	.attr('class', 'chart');

const x = chart
	.append('g')
	.attr('class', 'x-axis')
	.attr('transform', `translate(0, ${innerHeight})`);

const y = chart.append('g').attr('class', 'y-axis');

x.append('text')
	.attr('y', 50)
	.attr('x', innerWidth / 2 - 20)
	.attr('fill', 'black')
	.text('Price per Coin')
	.style('font-size', '14px')
	.style('font-family', 'sans-serif');

y.append('text')
	.attr('class', 'title')
	.attr('y', -35)
	.attr('text-anchor', 'start')
	.attr('fill', 'black')
	.text('Coin currency price trend last 5 years')
	.style('font-size', '14px')
	.style('font-family', 'sans-serif');

export function drawBarChart(data) {
	const xValue = (d) => d.price;
	const yValue = (d) => d.date;
	const t = transition().duration(1000);
	const dollarFormat = (d) => `$${format(',.2f')(d)}`;

	xScale.domain([0, max(data, xValue)]);
	yScale.domain(data.map(yValue));

	const bars = chart.selectAll('rect').data(data);

	bars.join(
		(enter) =>
			enter
				.append('rect')
				.attr('y', (d) => yScale(yValue(d)))
				.attr('width', (d) => xScale(xValue(d)))
				.attr('height', yScale.bandwidth())
				.attr('fill', 'steelblue'),
		(update) =>
			update
				.transition(t)
				.attr('y', (d) => yScale(yValue(d)))
				.attr('width', (d) => xScale(xValue(d)))
	);

	x.call(xAxis.tickFormat(dollarFormat).tickSize(-innerHeight))
		.select('.domain')
		.remove();

	y.call(yAxis).selectAll('.domain, .tick line').remove();
}
