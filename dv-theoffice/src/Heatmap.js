import React, { useEffect } from 'react';
import * as d3 from 'd3';

const Heatmap = ({ data }) => {
    useEffect(() => {// Dimensions and margins
        const margin = { top: 30, right: 50, bottom: 30, left: 150 };
        const width = 1000 - margin.left;
        const height = 500 - margin.top - margin.bottom;

        const characters = Object.keys(data);
        const metrics = Object.keys(data[0]).filter(d => d !== 'Character');
        const names = data.filter((d) => d.Character).map((d) => d.Character);

        d3.select("#heatmap").selectAll("*").remove();

        // Create SVG canvas
        const svg = d3.select("#heatmap")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);
    
        // Color scale for heatmap
        const colorScale = d3.scaleSequential(d3.interpolateYlGnBu)
          .domain([0, 100]);
    
        // X and Y scales
        const xScale = d3.scaleBand()
          .domain(characters)
          .range([0, width])
          .padding(0.1);

        const xNames = d3.scaleBand()
          .domain(names)
          .range([0, width])
          .padding(0.1);
    
        const yScale = d3.scaleBand()
          .domain(metrics)
          .range([0, height])
          .padding(0.1);
    
        // Create the heatmap cells
        svg.selectAll("rect")
          .data(characters.flatMap(character => {
            return metrics.map(metric => ({
              character,
              metric,
              value: data[character][metric]
            }));
          }))
          .enter()
          .append("rect")
          .attr("x", d => xScale(d.character))
          .attr("y", d => yScale(d.metric))
          .attr("width", xScale.bandwidth())
          .attr("height", yScale.bandwidth())
          .attr("fill", d => colorScale(d.value))
          .attr("stroke", "#ddd");
    
        // Add X axis labels (Characters)
        svg.append("g")
          .selectAll(".x-axis-label")
          .data(names)
          .enter()
          .append("text")
          .attr("class", "x-axis-label")
          .attr("x", d => xNames(d) + xScale.bandwidth()/2)
          .attr("y", height+margin.bottom/2)
          .attr("text-anchor", "middle")
          .attr("fill","white")
          .text(d => d);
    
        // Add Y axis labels (POS metrics)
        svg.append("g")
          .selectAll(".y-axis-label")
          .data(metrics)
          .enter()
          .append("text")
          .attr("class", "y-axis-label")
          .attr("x", -10)
          .attr("y", d => yScale(d) + yScale.bandwidth()/2)
          .attr("text-anchor", "end")
          .attr("fill","white")
        //   .attr("transform", "rotate(-90)")
          .text(d => d);
      }, [data]);

  return <div id="heatmap"></div>;
};

export default Heatmap;
