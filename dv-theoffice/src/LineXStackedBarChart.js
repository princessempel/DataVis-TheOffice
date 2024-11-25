import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const LineXStackedBarChart = ({ csvFilePath, dataKey }) => {
  const [data, setData] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    d3.csv(csvFilePath).then((rawData) => {
      const processedData = rawData.map((d) => ({
        x_label: d.x_label,
        season: +d.season,
        episode_number: +d.episode_number,
        ratings: +d.ratings,
        scaled_ratings: +d.scaled_ratings,
        viewership_mil: +d.viewership_mil,
      }));
      setData(processedData);
    });
  }, [csvFilePath]);

  useEffect(() => {
    if (data.length === 0) return;

    const margin = { top: 20, right: 30, bottom: 70, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    if (data.length === 0) return;

    // Clear SVG before re-rendering
    d3.select(svgRef.current).selectAll("*").remove();

    // Responsive SVG (scales based on window size)
    const svg = d3.select(svgRef.current)
    .attr("width", "70%") 
    .attr("height", "70%")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`) // Scalable dimensions
    .style("background-color", "#2A3C5F") // Match your desired background
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Scales
    const x = d3.scalePoint()
      .domain(data.map((d) => d.x_label))
      .range([0, width])
      .padding(0.5);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d[dataKey])])
      .range([height, 0]);

    const color = d3.scaleOrdinal()
      .domain([...new Set(data.map((d) => d.season))])
      .range(d3.schemeCategory10);

    // Line chart ratings -- too lazy to change label but ratings or whatever the dataKey is
    const lineRatings = d3.line()
      .x((d) => x(d.x_label))
      .y((d) => y(d[dataKey]));

    // Draw line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#4BA8B2")
      .attr("stroke-width", 2)
      .attr("d", lineRatings);

    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

    // Style X-axis lines and ticks to be white
    svg.selectAll(".domain, .tick line")
    .attr("stroke", "white");

    svg.selectAll(".tick text")
        .remove();

    // Y-axis
    svg.append("g")
    .call(d3.axisLeft(y));

    // Set Y-axis lines to be white
    svg.selectAll(".domain, .tick line")
    .attr("stroke", "white");

    svg.selectAll(".tick text") 
    .attr("fill", "white");

    // Stacked bar chart (as bottom axis)
    const seasons = [...new Set(data.map((d) => d.season))];
    const barWidth = width / seasons.length;

    seasons.forEach((season, i) => {
      svg.append("rect")
        .attr("x", i * barWidth) 
        .attr("y", height)
        .attr("width", barWidth)
        .attr("height", 20)
        .attr("fill", color(season))
        .attr("opacity", 0.8);
    });

    // Add season labels
    svg.selectAll(".season-label")
      .data(seasons)
      .enter()
      .append("text")
      .attr("x", (d, i) => i * barWidth + barWidth / 2)
      .attr("y", height + 50)
      .attr("text-anchor", "middle")
      .text((d) => `Season ${d}`)
      .style("font-size", "10px")
      .style("fill", "white");
  }, [data, dataKey]);

  return <svg ref={svgRef}></svg>;
};

export default LineXStackedBarChart;
