import React, { useEffect } from 'react';
import * as d3 from 'd3';

const ParallelCoordinates = ({ data }) => {
  useEffect(() => {
    // Dimensions and margins
    const margin = { top: 30, right: 50, bottom: 30, left: 50 };
    const width = 1000 - margin.left;
    const height = 500 - margin.top - margin.bottom;

    // Remove any existing SVG (for re-renders)
    d3.select("#parallel-coordinates").selectAll("*").remove();

    // Create SVG
    const svg = d3
      .select("#parallel-coordinates")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom*2)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Extract dimensions (keys) of the data
    const dimensions = Object.keys(data[0]).filter(d => (d !== "Character" && d !== "Photo"));

    // Create a scale for each dimension
    const yScales = {};
    dimensions.forEach(dim => {
      yScales[dim] = d3
        .scaleLinear()
        .domain(d3.extent(data, d => d[dim]))
        .range([height, 0]);
    });

    // Create an x-scale for dimensions
    const xScale = d3
      .scalePoint()
      .range([0, width])
      .domain(dimensions);

    // Draw lines
    const line = d3.line();
    svg
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .attr("d", d => 
        line(dimensions.map(dim => [xScale(dim), yScales[dim](d[dim])]))
      )
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1)
      .attr("opacity", 0.7);

    // Add axes
    dimensions.forEach(dim => {
      svg
        .append("g")
        .attr("transform", `translate(${xScale(dim)},10)`)
        .call(d3.axisLeft(yScales[dim]));

      svg
        .append("text")
        .attr("x", xScale(dim))
        .attr("y", -20)
        .attr("text-anchor", "middle")
        .attr("fill","white")
        .text(dim);
    });
    
    data.forEach(d => {
        dimensions.forEach(dim => {
          svg
            .append("circle")
            .attr("cx", xScale(dim))
            .attr("cy", yScales[dim](d[dim]))
            .attr("r", 10)
            .attr("fill", "white")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2);
  
            if (d.Photo) {
                console.log(d.Photo);  // Verify the path of the image
                svg
                  .append("image")
                  .attr("href", d.Photo) // Use 'href' instead of 'xlink:href'
                  .attr("x", xScale(dim) - 10) // Center the image in the circle
                  .attr("y", yScales[dim](d[dim]) - 15)
                  .attr("width", 30)
                  .attr("height", 30)
                  .attr("clip-path", "url(#clip)"); // Use clip-path defined in 'defs'
              }
            });
          });
    }, [data]);

  

  return <div id="parallel-coordinates"></div>;
};

export default ParallelCoordinates;
