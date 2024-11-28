import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const GroupedScatterplot = ({ data }) => {
    const chartRef = useRef();

    useEffect(() => {
        console.log("data for scatterplot = ", data)
        // Clear the previous chart
        d3.select(chartRef.current).select("svg").remove();

        // Chart dimensions
        const margin = { top: 50, right: 30, bottom: 110, left: 100 };
        const width = 1000 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;

        // Create SVG container
        const svg = d3
            .select(chartRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Scales
        const xScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.episode) + 10]) // Continuous x-axis
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain([0, 1]) // Scaled ratings
            .range([height, 0]);

        const sizeScale = d3
            .scaleSqrt()
            .domain([0, d3.max(data, (d) => d.scenes)]) // Bubble size based on scenes
            .range([3, 15]);

        const colorScale = d3
            .scaleOrdinal()
            .domain([...new Set(data.map((d) => d.season))]) // Unique seasons
            .range(d3.schemeCategory10);

        // Draw scatter points
        const points = svg
            .selectAll(".scatter-point")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "scatter-point")
            .attr("cx", (d) => {
                const cx = xScale(d.episode);
                // console.log("cx:", cx, "episode:", d.episode); // Debug cx
                return cx;
            })
            .attr("cy", (d) => {
                const cy = yScale(d.scaled_ratings);
                // sconsole.log("cy:", cy, "scaled_ratings:", d.scaled_ratings); // Debug cy
                return cy;
            })
            .attr("r", (d) => {
                const r = sizeScale(d.scenes);
                console.log("r:", r, "scenes:", d.scenes);
                return r;
            })
            .attr("fill", (d) => colorScale(d.season))
            .attr("opacity", 0.8);

        // Tooltip
        const tooltip = d3.select("#tooltip");
        points
            .on("mouseover", (event, d) => {
                tooltip
                    .style("visibility", "visible")
                    .html(
                        `<strong>Season ${d.season}, Episode ${d.episode}</strong><br />
                        ${d.title}<br />
                        <Strong>Scaled Rating: </Strong> ${d.scaled_ratings.toFixed(2)}<br />
                        <Strong>Scenes: </Strong>${d.scenes}`
                    )
                    .style("top", `${event.pageY + 10}px`)
                    .style("left", `${event.pageX + 10}px`);
            })
            .on("mousemove", (event) => {
                tooltip
                    .style("top", `${event.pageY + 10}px`)
                    .style("left", `${event.pageX + 10}px`);
            })
            .on("mouseout", () => {
                tooltip.style("visibility", "hidden");
            });

        // Add X-axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(
                d3.axisBottom(xScale)
                    .tickValues(
                        d3.range(0, d3.max(data, (d) => d.episode) + 1, 10)
                    )
                    .tickFormat((d) => `E${d}`)
            );

        // Add Y-axis
        svg.append("g").call(d3.axisLeft(yScale));

        // Axis labels
        // svg.append("text")
        //     .attr("x", width / 2)
        //     .attr("y", height + margin.bottom - 10)
        //     .attr("text-anchor", "middle")
        //     .text("Episodes");

        svg.append("text")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 15)
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .text("Scaled Ratings");

        // Chart title
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -margin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .style("font-weight", "bold")
            .text("Number of Scenes in Each Episode by Rating");

        // Axis labels
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 40) // Adjust upward to make more room
            .attr("text-anchor", "middle")
            .text("Episodes");

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 20) // Space for the first note
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-style", "italic")
            .text("Chronologically grouped by seasons");

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom) // Ensure this is below the first note
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("font-style", "italic")
            .text("Bubble size represents the number of scenes");




    }, [data]);

    return <div ref={chartRef}></div>;
};

export default GroupedScatterplot;
