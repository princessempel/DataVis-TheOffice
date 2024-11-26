import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const LineXStackedBarChart = ({ csvFilePath, dataKey }) => {
  const svgRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv(csvFilePath).then((rawData) => {
      const processedData = rawData.map((d) => ({
        x_label: d.x_label,
        episode_title: d.episode_title,
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
  
    // Clear SVG before re-rendering
    d3.select(svgRef.current).selectAll("*").remove();

    // Responsive SVG (scales based on window size)
    const svg = d3.select(svgRef.current)
      .attr("width", "70%") 
      .attr("height", "70%")
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .style("background-color", "#2A3C5F") 
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    const x = d3.scalePoint()
      .domain(data.map((d) => d.x_label))
      .range([0, width])
      .padding(0.5);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d[dataKey])])
      .nice()
      .range([height, 0]);
  
    const color = d3.scaleOrdinal()
      .domain([...new Set(data.map((d) => d.season))])
      .range(d3.schemeCategory10);
  
    // Tooltip div
    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("background-color", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("font-size", "12px")
      .style("display", "none");
  
    // X-Axis
    const xAxis = svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    xAxis.selectAll(".domain, .tick line") 
      .attr("stroke", "white"); 

    xAxis.selectAll(".tick text") 
      .remove();

    // Y-Axis
    const yAxis = svg.append("g")
      .call(d3.axisLeft(y));

    yAxis.selectAll(".domain, .tick line")
      .attr("stroke", "white"); 

    yAxis.selectAll(".tick text") 
      .attr("fill", "white");
  
    // Line Chart
    const line = d3.line()
      .x((d) => x(d.x_label))
      .y((d) => y(d[dataKey]));
  
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#4BA8B2")
      .attr("stroke-width", 2)
      .attr("d", line);
  
    // Stacked Bar Chart
    svg.selectAll(".stacked-bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "stacked-bar")
      .attr("x", (d) => x(d.x_label) - 1.5)
      .attr("y", height)
      .attr("width", width / data.length - 0.5)
      .attr("height", 20)
      .attr("fill", (d) => color(d.season))
      .attr("opacity", 0.8)
      .on("mouseover", (event, d) => {
        tooltip
          .style("display", "block")
          .html(`
            <strong>Season ${d.season}, Episode ${d.episode_number}</strong><br/>
            ${d.episode_title}
          `);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mouseleave", () => {
        tooltip.style("display", "none");
      });

    // Season Labels
    const seasonCenters = d3.rollup(
      data,
      (episodes) => d3.mean(episodes.map((d) => x(d.x_label))),
      (d) => d.season
    );
  
    seasonCenters.forEach((center, season) => {
      svg.append("text")
        .attr("x", center)
        .attr("y", height + 20 + 20)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .style("font-size", "12px")
        .text(`S${season}`);
    });

    // Line Chart Points (added after stacked bar chart to put any line chart points on top of the bars)
    svg.selectAll(".point")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "point")
      .attr("cx", (d) => x(d.x_label))
      .attr("cy", (d) => y(d[dataKey]))
      .attr("r", 3)
      .attr("fill", "#4BA8B2")
      .on("mouseover", (event, d) => {
        tooltip
          .style("display", "block")
          .html(`
            <strong>Season ${d.season}, Episode ${d.episode_number}</strong><br/>
            ${d.episode_title} <br/><br/>
            ${dataKey}: ${d[dataKey]}<br/>
            Viewership: ${d.viewership_mil}M
          `);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mouseleave", () => {
        tooltip.style("display", "none");
      });
  
    return () => {
      tooltip.remove();
    };
  }, [data, dataKey]);
  

  return <svg ref={svgRef}></svg>;
};

export default LineXStackedBarChart;