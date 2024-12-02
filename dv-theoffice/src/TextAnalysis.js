import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TextAnalysis = () => {
    const chartRef = useRef();

    useEffect(() => {
        // Load character_metrics.json
        fetch('DataVis-TheOffice/data/character_metrics.json')
            .then((response) => response.json())
            .then((data) => createBubblePlot(data));
    }, []);

    const createBubblePlot = (data) => {
        const width = 800;
        const height = 600;

        // Clear previous chart if any
        d3.select(chartRef.current).selectAll('*').remove();

        // Create SVG container
        const svg = d3
            .select(chartRef.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        // Process the data into a suitable format
        const processedData = Object.entries(data).map(([character, metrics]) => ({
            character,
            avgSentenceLength: metrics['Average Sentence Length'],
            syllablesPerWord: metrics['Syllables per Word'],
            avgWordLength: metrics['Average Word Length'], // For bubble size
        }));

        // Set up scales
        const xScale = d3
            .scaleLinear()
            .domain([0, d3.max(processedData, (d) => d.avgSentenceLength)])
            .range([50, width - 50]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(processedData, (d) => d.syllablesPerWord)])
            .range([height - 50, 50]);

        const sizeScale = d3
            .scaleSqrt()
            .domain([0, d3.max(processedData, (d) => d.avgWordLength)])
            .range([5, 30]);

        // Add axes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        svg
            .append('g')
            .attr('transform', `translate(0, ${height - 50})`)
            .call(xAxis);

        svg
            .append('g')
            .attr('transform', 'translate(50, 0)')
            .call(yAxis);

        // Add labels
        svg
            .append('text')
            .attr('x', width / 2)
            .attr('y', height - 10)
            .style('text-anchor', 'middle')
            .text('Average Sentence Length (Words)');

        svg
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -height / 2)
            .attr('y', 20)
            .style('text-anchor', 'middle')
            .text('Syllables Per Word');

        // Add bubbles
        svg
            .selectAll('.bubble')
            .data(processedData)
            .enter()
            .append('circle')
            .attr('cx', (d) => xScale(d.avgSentenceLength))
            .attr('cy', (d) => yScale(d.syllablesPerWord))
            .attr('r', (d) => sizeScale(d.avgWordLength))
            .attr('fill', 'steelblue')
            .attr('opacity', 0.7)
            .attr('stroke', 'black');

        // Add labels to bubbles
        svg
            .selectAll('.bubble-label')
            .data(processedData)
            .enter()
            .append('text')
            .attr('x', (d) => xScale(d.avgSentenceLength))
            .attr('y', (d) => yScale(d.syllablesPerWord))
            .style('text-anchor', 'middle')
            .style('font-size', '10px')
            .text((d) => d.character);
            
            const tooltip = d3
            .select(chartRef.current)
            .append('div')
            .style('position', 'absolute')
            .style('background', 'white')
            .style('padding', '5px')
            .style('border', '1px solid black')
            .style('display', 'none');
        
        svg
            .selectAll('.bubble')
            .on('mouseover', (event, d) => {
                tooltip
                    .style('display', 'block')
                    .html(`Character: ${d.character}<br>Avg Word Length: ${d.avgWordLength.toFixed(2)}`)
                    .style('left', `${event.pageX + 5}px`)
                    .style('top', `${event.pageY + 5}px`);
            })
            .on('mouseout', () => {
                tooltip.style('display', 'none');
            });
        
    };

    return <div ref={chartRef}></div>;
};

export default TextAnalysis;