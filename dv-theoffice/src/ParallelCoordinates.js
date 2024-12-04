import React, { useEffect } from 'react';
import * as d3 from 'd3';
import img0 from './../src/profileImages/MichaelScott.png';
import img1 from './../src/profileImages/DwightSchrute.png';
import img2 from './../src/profileImages/PamHalpert.png';
import img3 from './../src/profileImages/JimHalpert.png';
import img4 from './../src/profileImages/KellyKapoor.png';
import img5 from './../src/profileImages/PhyllisVance.png';
import img6 from './../src/profileImages/AndyBernard.png';
import img7 from './../src/profileImages/DarrylPhilbin.png';
import img8 from './../src/profileImages/OscarMartinez.png';
import img9 from './../src/profileImages/AngelaMartin.png';
import img10 from './../src/profileImages/RyanHoward.png';
import img11 from './../src/profileImages/ErinHannon.png';
import img12 from './../src/profileImages/TobyFlenderson.png';
import img13 from './../src/profileImages/StanleyHudson.png';
import img14 from './../src/profileImages/KevinMalone.png';
import img15 from './../src/profileImages/CreedBratton.png';
import img16 from './../src/profileImages/MeredithPalmer.png';

const images = {"Michael":img0, "Dwight":img1,"Pam":img2,"Jim":img3,"Kelly":img4,"Phyllis":img5,"Andy":img6,
    "Darryl":img7,"Oscar":img8,"Angela":img9,"Ryan":img10,"Erin":img11,"Toby":img12,"Stanley":img13,
    "Kevin":img14,"Creed":img15,"Meredith":img16};
const ParallelCoordinates = ({ data }) => {
  useEffect(() => {
    // Dimensions and margins
    const margin = { top: 30, right: 50, bottom: 30, left: 50 };
    const width = 800 - margin.left;
    const height = 500 - margin.top - margin.bottom;

    // Remove any existing SVG (for re-renders)
    d3.select("#parallel-coordinates").selectAll("*").remove();

    // Create SVG
    const svg = d3
      .select("#parallel-coordinates")
      .append("svg")
      .attr("width", width + margin.left + margin.top)
      .attr("height", height + margin.top + margin.bottom*2)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top+40})`);

    // Extract dimensions (keys) of the data
    const dimensions = Object.keys(data[0]).filter(d => (d !== "Character" && d !== "Photo"));
    const names = {"Avg Word Length": "Avg word \nlength", "Syllables per Word":"Syllables \nper word", 
    "Avg Sentence Length":"Avg sentence \nlength","Hapax Legomena":"Hapax\n legomena"}

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

      svg.selectAll("path.line")
      .data(data)
      .enter().append("path")
      .attr("class", function(d) { return `line-${d.Character}`; })  // Assign a unique class for each character
      .attr("d", d => line(dimensions.map(dim => [xScale(dim), yScales[dim](d[dim])])))
      .style("stroke", "steelblue")
      .style("stroke-width", 1)
      .style("fill", "none");
    // Add axes
    dimensions.forEach(dim => {
      svg
        .append("g")
        .attr("transform", `translate(${xScale(dim)},10)`)
        .call(d3.axisLeft(yScales[dim]));

      svg
        .append("text")
        .attr("x", xScale(dim))
        .attr("y", -30)
        .attr("text-anchor", "middle")
        .attr("fill","white")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .selectAll("tspan")
        .data(names[dim].split("\n")) // Split the text into lines
        .enter()
        .append("tspan")
        .attr("x", xScale(dim)) // Align each line to the same x position
        .attr("dy", (d, i) => i * 14) // Adjust spacing between lines
        .text(d => d);
    });

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

    var counter = 0;

    data.forEach(d => {
        dimensions.forEach(dim => {
            svg.append("defs")
            .append("clipPath")
            .attr("id", `clip-${d.Character}-${dim}-${counter}`)  // Make the clip path ID unique for each character and axis
            .append("circle")
            .attr("cx", xScale(dim))  // Center the circle based on the x scale of the dimension
            .attr("cy", yScales[dim](d[dim]))  // Center the circle based on the y scale of the data point
            .attr("r", 15); 
        svg
            .append("image")
            .attr("href", images[d.Character]) // Use 'href' instead of 'xlink:href'
            .attr("x", xScale(dim) - 15) // Center the image in the circle
            .attr("y", yScales[dim](d[dim]) - 15)
            .attr("width", 30)
            .attr("height", 30)
            
            .on("mouseover", function(event) {
                  tooltip
            .style("visibility", "visible")
            .html(
                `<strong>Character:</strong> ${d.Character}<br>
                <strong>${dim}:</strong> ${d[dim]}`
            );

            d3.selectAll(`.line-${d.Character}`)
            .style("stroke", "orange")  // Highlight lines in orange
            .style("stroke-width", 5);
              })
              .on("mousemove", event => {
                tooltip
                .style("top", `${event.pageY + 10}px`)
                .style("left", `${event.pageX + 10}px`);
            })
            .on("mouseout", () => {
                tooltip.style("visibility", "hidden");

                d3.selectAll(`.line-${d.Character}`)
                .style("stroke", "steelblue")  // Reset the line color
                .style("stroke-width", 1);
            })
              .attr("clip-path", `url(#clip-${d.Character}-${dim}-${counter})`); // Use clip-path defined in 'defs'
            });
            counter++;
          });
    }, [data]);

  

  return <div id="parallel-coordinates"></div>;
};

export default ParallelCoordinates;
