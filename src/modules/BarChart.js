import {
	csv,
	select,
	scaleLinear,
	max,
	scaleBand,
	axisLeft,
	axisBottom,
	format,
} from 'https://cdn.skypack.dev/d3@7';

// SVG Element and attributes
const svg = select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

// Dimensions
const margin = { top: 30, right: 20, bottom: 70, left: 70 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Create group
const g = svg
	.append('g')
	.attr('transform', `translate(${margin.left}, ${margin.top})`);

const xScale = scaleLinear().range([0, innerWidth]);
const yScale = scaleBand().range([0, innerHeight]).padding(0.1);

// Title X Scale
g.append('text')
	.attr('y', 350)
	.attr('x', innerWidth / 2 - 50)
	.attr('fill', 'black')
	.text('Price per Coin')
	.style('font-size', '14px')
	.style('font-family', 'sans-serif');

// Title Chart
g.append('text')
	.attr('class', 'title')
	.attr('dy', -15)
	.attr('text-anchor', 'start')
	.text('Coin currency price trend last 5 years')
	.style('font-size', '14px')
	.style('font-family', 'sans-serif');

export function BarChart(data) {
	// Data
	const xValue = (d) => d.price;
	const yValue = (d) => d.date;

	// Formats
	const dollarFormat = (d) => `$${format(',.2f')(d)}`;

	// Bar rectangles
	xScale.domain([0, max(data, xValue)]);
	yScale.domain(data.map(yValue));

	// Y Scale
	g.append('g')
		.call(axisLeft(yScale))
		.selectAll('.domain, .tick line')
		.remove();

	// X Scale
	g.append('g')
		.call(
			axisBottom(xScale).tickFormat(dollarFormat).tickSize(-innerHeight)
		)
		.attr('transform', `translate(0, ${innerHeight})`)
		.select('.domain')
		.remove();

	// Draw chart based on data
	g.selectAll('rect')
		.data(data)
		.join('rect')
		.attr('y', (d) => yScale(yValue(d)))
		.attr('width', (d) => xScale(xValue(d)))
		.attr('height', yScale.bandwidth())
		.attr('fill', 'steelblue');
}
