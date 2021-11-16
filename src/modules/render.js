import {
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

export function render(data) {
	// Dimensions
	const margin = { top: 20, right: 20, bottom: 20, left: 20 };
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	// Data
	const xValue = (d) => d.price;
	const yValue = (d) => d.date;

	// Formats
	const dollarFormat = (d) => `$${format(',.2f')(d)}`;

	// Bar rectangles
	const xScale = scaleLinear()
		.domain([0, max(data, xValue)])
		.range([0, innerWidth]);
	const yScale = scaleBand()
		.domain(data.map(yValue))
		.range([0, innerHeight])
		.padding(0.1);

	// SVG Element in variable g
	const g = svg
		.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`);

	// X & Y Axis
	g.append('g')
		.call(axisLeft(yScale))
		.selectAll('.domain, .tick line')
		.remove();
	g.append('g')
		.call(axisBottom(xScale).tickFormat(dollarFormat))
		.attr('transform', `translate(0, ${innerHeight})`)
		.select('.domain')
		.remove();

	g.append('text')
		.attr('class', 'title')
		.attr('x', width / 2)
		.attr('text-anchor', 'middle')
		.text('Crypto coin price trend')
		.style('font-size', '20px');

	// Draw chart based on data
	g.selectAll('rect')
		.data(data)
		.enter(data)
		.append('rect')
		.attr('y', (d) => yScale(yValue(d)))
		.attr('width', (d) => xScale(xValue(d)))
		.attr('height', yScale.bandwidth())
		.attr('fill', 'steelblue');
}
