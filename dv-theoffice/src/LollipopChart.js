import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const LollipopChart = ({ data }) => {
    const chartRef = useRef();

    useEffect(() => {
        console.log("Data for Lollipop Chart:", data);
        // Clear previous chart
        d3.select(chartRef.current).select("svg").remove();

        // Set dimensions
        const margin = { top: 50, right: 30, bottom: 100, left: 50 };
        const width = 1000 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;

        // Create SVG
        const svg = d3
            .select(chartRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        // Add title
        svg
            .append("text")
            .attr("x", width / 2) // Center the title
            .attr("y", -margin.top / 2) // Adjust to place it slightly below the top
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .style("font-weight", "bold")
            .style("fill", "#000") // Ensure a visible color (black in this case)
            .text("Number of Lines Spoken in Each Episode");


        // Scales
        const xScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.episode)]) // Start from 0, extend to max episode
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.lines)]) // Map lines spoken
            .range([height, 0]);

        const colorScale = d3
            .scaleOrdinal()
            .domain([...new Set(data.map((d) => d.season))]) // Unique seasons
            .range(d3.schemeCategory10);



        // Lollipop stems
        svg
            .selectAll(".stem")
            .data(data)
            .enter()
            .append("line")
            .attr("class", (d) => `stem-${d.episode}`) // Add a class for highlighting
            .attr("x1", (d) => xScale(d.episode))
            .attr("x2", (d) => xScale(d.episode))
            .attr("y1", yScale(0))
            .attr("y2", (d) => yScale(d.lines))
            .attr("stroke", "#ccc");

        // Add a tooltip
        const tooltip = d3.select("#tooltip");

        // Lollipop circles
        svg
            .selectAll(".circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d) => xScale(d.episode))
            .attr("cy", (d) => yScale(d.lines))
            .attr("r", 5)
            .attr("fill", (d) => colorScale(d.season))
            .attr("opacity", 0.8)
            .on("mouseover", (event, d) => {
                // Highlight the lollipop stem and circle
                svg.selectAll(`.stem-${d.episode}`)
                    .attr("stroke", "yellow")
                    .attr("stroke-width", 2);

                svg.selectAll(`.circle-${d.episode}`)
                    .attr("stroke", "yellow")
                    .attr("stroke-width", 2);

                // Show tooltip with content
                tooltip
                    .style("visibility", "visible")
                    .html(`
                <strong>Season ${d.season}, Episode ${d.episode}</strong><br/>
                ${d.title} <br/>
                <strong>Lines Spoken:</strong> ${d.lines}
            `);
            })
            .on("mousemove", (event) => {
                tooltip
                    .style("top", `${event.pageY + 10}px`)
                    .style("left", `${event.pageX + 10}px`);
            })
            .on("mouseout", (event, d) => {
                // Remove highlight from stem and circle
                svg.selectAll(`.stem-${d.episode}`)
                    .attr("stroke", "#ccc")
                    .attr("stroke-width", 1);

                svg.selectAll(`.circle-${d.episode}`)
                    .attr("stroke", "none");

                // Hide tooltip
                tooltip.style("visibility", "hidden");
            });


        // Add X-axis
        svg
            .append("g")
            .attr("transform", `translate(0,${height})`)
            .call(
                d3.axisBottom(xScale)
                    .tickValues(
                        d3.range(0, d3.max(data, (d) => d.episode) + 1, 10) // Generate ticks every 10 episodes
                    )
                    .tickFormat((d) => `E${d}`) // Add "E" prefix to each tick
            );

        // Add Y-axis
        svg.append("g").call(d3.axisLeft(yScale).ticks(5));

        // Add axis labels
        svg
            .append("text")
            .attr("class", "x-axis-label")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 40)
            .attr("text-anchor", "middle")
            .text("Episodes");

        svg
            .append("text")
            .attr("class", "y-axis-label")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 15)
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .text("Number of Lines");

        // Add label/note
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 20) // Space for the first note
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-style", "italic")
            .text("Chronologically grouped by seasons");
    }, [data]);

    return <div ref={chartRef}></div>;
};

export default LollipopChart;
