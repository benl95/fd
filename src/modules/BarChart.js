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

export function BarChart(data, { label, yLabel }) {
	// Dimensions
	const margin = { top: 30, right: 20, bottom: 70, left: 70 };
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
	const yAxisGroup = g.append('g').call(axisLeft(yScale));
	yAxisGroup.selectAll('.domain, .tick line').remove();

	const xAxisGroup = g
		.append('g')
		.call(
			axisBottom(xScale).tickFormat(dollarFormat).tickSize(-innerHeight)
		)
		.attr('transform', `translate(0, ${innerHeight})`);
	xAxisGroup.select('.domain').remove();
	xAxisGroup
		.append('text')
		.attr('y', 40)
		.attr('x', innerWidth / 2)
		.attr('fill', 'black')
		.text(yLabel)
		.style('font-size', '14px');

	g.append('text')
		.attr('class', 'title')
		.attr('dy', -15)
		.attr('text-anchor', 'start')
		.text(label)
		.style('font-size', '14px')
		.style('font-family', 'sans-serif');

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