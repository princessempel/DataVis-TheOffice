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
          .attr("width", width + margin.left)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left-10},${margin.top})`);

          const globalMax = {};
          metrics.forEach((metric) => {
            globalMax[metric] = d3.max(characters.map((character) => data[character][metric]));
          });

          const globalMin = {};
          metrics.forEach((metric) => {
            globalMin[metric] = d3.min(characters.map((character) => data[character][metric]));
          });
          // Create a color scale for each metric
          const colorScales = {};
          metrics.forEach((metric) => {
            colorScales[metric] = d3.scaleLinear().domain([globalMin[metric], globalMax[metric]]).range(["#bda640", "#8c1c1c"]);
          });
        // X and Y scales
        const xScale = d3.scaleBand()
          .domain(characters)
          .range([0, width])
          .padding(0.4);

        const xNames = d3.scaleBand()
          .domain(names)
          .range([0, width])
          .padding(0.1);
    
        const yScale = d3.scaleBand()
          .domain(metrics)
          .range([0, height])
          .padding(0.1);
    
        // Add a tooltip div
        const tooltip = d3
        .select("body")
        .append("div")
        .style("position", "absolute")
        .style("background-color", "rgba(0,0, 0, 0.8)")
        .style("color", "#61dafb")
        .style("box-shadow","0 1px 4px 0 rgba(0,0,0,0.2)")
        .style("padding", "8px")
        .style("border-radius", "4px")
        .style("pointer-events", "none")
        .style("visibility", "hidden");

        // Create the heatmap cells
        svg.selectAll("rect")
          .data(characters.flatMap(character => {
            return metrics.map(metric => ({
              character,
              metric,
              value: data[character][metric] 
            })
        );
            
          }))
          .enter()
          .append("rect")
          .attr("x", d => xScale(d.character))
          .attr("y", d => yScale(d.metric))
          .attr("width", xScale.bandwidth())
          .attr("height", yScale.bandwidth())
          .attr("fill", d => colorScales[d.metric](d.value))
          .attr("stroke", "#ddd")
        .on("mouseover", (event, d) => {
            tooltip
            .style("visibility", "visible")
            .html(
                `<strong>Character:</strong> ${names[d.character]}<br>
                <strong>${d.metric}:</strong> ${d.value}%`
            );
        })
        .on("mousemove", event => {
            tooltip
            .style("top", `${event.pageY + 10}px`)
            .style("left", `${event.pageX + 10}px`);
        })
        .on("mouseout", () => {
            tooltip.style("visibility", "hidden");
        });
    
        // Add X axis labels (Characters)
        svg.append("g")
          .selectAll(".x-axis-label")
          .data(names)
          .enter()
          .append("text")
          .attr("class", "x-axis-label")
          .attr("x", d => xNames(d) + xNames.bandwidth()/2)
          .attr("y", height+margin.bottom/2)
          .attr("text-anchor", "middle")
          .attr("fill","white")
          .style("font-size", "12px")
          .text(d => d);
    
        // Add Y axis labels (POS metrics)
        svg.append("g")
          .selectAll(".y-axis-label")
          .data(metrics)
          .enter()
          .append("text")
          .attr("class", "y-axis-label")
          .attr("x", 0)
          .attr("y", d => yScale(d) + yScale.bandwidth()/2)
          .attr("text-anchor", "end")
          .attr("fill","white")
          .text(d => d);

          const gradientLineHeight = height - margin.top; // Same as the height of the heatmap
const gradientLineWidth = 10; // Width of the gradient line

// Add a group for the gradient line
const gradientGroup = svg.append("g")
  .attr("transform", `translate(${width}, 15)`); // Adjust position to the left of the heatmap

// Define the gradient
const defs = svg.append("defs");
const verticalGradient = defs.append("linearGradient")
  .attr("id", "vertical-gradient")
  .attr("x1", "0%")
  .attr("x2", "0%")
  .attr("y1", "0%")
  .attr("y2", "100%"); // Vertical gradient

// Set gradient stops
verticalGradient.append("stop")
  .attr("offset", "0%")
  .attr("stop-color", "#8c1c1c"); // Min color

verticalGradient.append("stop")
  .attr("offset", "100%")
  .attr("stop-color", "#bda640"); // Max colorbda640

// Add the gradient rectangle
gradientGroup.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", gradientLineWidth)
  .attr("height", gradientLineHeight)
  .style("fill", "url(#vertical-gradient)");

// Add labels
gradientGroup.append("text")
  .attr("x", 10) // Adjust position to the left of the gradient
  .attr("y", -5) // Slight offset from the top
  .attr("text-anchor", "end")
  .style("font-size", "8px")
  .style("fill", "white") // Label color
  .text("Max %");

gradientGroup.append("text")
  .attr("x", 10) // Adjust position to the left of the gradient
  .attr("y", gradientLineHeight + 10) // Slight offset from the bottom
  .attr("text-anchor", "end")
  .style("font-size", "8px")
  .style("fill", "white") // Label color
  .text("Min %");


      }, [data]);

  return <div id="heatmap"></div>;
};

export default Heatmap;
