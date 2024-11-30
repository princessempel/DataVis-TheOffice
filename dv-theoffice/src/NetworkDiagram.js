import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const NetworkDiagram = () => {
    const svgRef = useRef();

    useEffect(() => {
        const margin = { top: 0, right: 20, bottom: 0, left: 20 };
        const width = 1000 - margin.left - margin.right;
        const height = 800 - margin.top - margin.bottom;

        // Clear SVG before re-rendering
        d3.select(svgRef.current).selectAll("*").remove();

        // Responsive SVG (scales based on window size)
        const svg = d3.select(svgRef.current)
            .attr("width", "90%")
            .attr("height", "90%")
            .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
            .style("background-color", "#2A3C5F")
            .append("g")
            // .attr("transform", `translate(${margin.left}, ${margin.top})`);
        // const width = 800;
        // const height = 600;
    
        // Load nodes and edges JSON
        Promise.all([
            fetch("/DataVis-TheOffice/data/network_nodes.json").then(res => res.json()),
            fetch("/DataVis-TheOffice/data/network_edges.json").then(res => res.json())
        ]).then(([nodes, edges]) => {
            // Add missing nodes dynamically
            const nodeIds = new Set(nodes.map(node => node.id));
            edges.forEach(edge => {
                if (!nodeIds.has(edge.source)) {
                    nodes.push({ id: edge.source });
                    nodeIds.add(edge.source);
                }
                if (!nodeIds.has(edge.target)) {
                    nodes.push({ id: edge.target });
                    nodeIds.add(edge.target);
                }
            });

            // Calculate mentions for nodes (importance)
            const nodeMentions = {};
            edges.forEach((edge) => {
                nodeMentions[edge.source] = (nodeMentions[edge.source] || 0) + edge.mentions;
                nodeMentions[edge.target] = (nodeMentions[edge.target] || 0) + edge.mentions;
            });

            // Assign a size based on mentions
            nodes.forEach((node) => {
                node.size = nodeMentions[node.id] || 1; // Default size if no mentions
            });

            const simulation = d3.forceSimulation(nodes)
                .force("link", d3.forceLink(edges).id(d => d.id).distance(200)) // Spread links further apart
                .force("charge", d3.forceManyBody().strength(-1000)) // Stronger repulsion for more spread
                .force("center", d3.forceCenter(width / 2, height / 2));

            // Draw links
            const link = svg.append("g")
                .selectAll("line")
                .data(edges)
                .enter().append("line")
                .attr("stroke", "#999")
                .attr("stroke-opacity", 0.6)
                .attr("stroke-width", d => Math.sqrt(d.mentions)); // Edge thickness by weight

            const tooltip = d3.select("body").append("div")
                .style("position", "absolute")
                .style("background-color", "rgba(0, 0, 0, 0.8)")
                .style("color", "white")
                .style("padding", "8px")
                .style("border-radius", "4px")
                .style("pointer-events", "none")
                .style("font-size", "12px")
                .style("display", "none");
            
            link.on("mouseover", (event, d) => {
                tooltip
                    .style("display", "block")
                    .html(`Source: ${d.source.id}<br>Target: ${d.target.id}<br>Mentions: ${d.mentions}`);
            })
            .on("mousemove", (event) => {
                tooltip
                    .style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY + 10}px`);
            })
            .on("mouseout", () => {
                tooltip.style("display", "none");
            });
            
            // Draw nodes
            const node = svg.append("g")
            .selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .attr("r", d => Math.sqrt(d.size)) // Node size by mentions
            .attr("fill", "steelblue")
            .call(drag(simulation));

            // Highlight edges connected to node on hover
            node.on("mouseover", (event, d) => {
                link
                    .attr("stroke", link => (link.source.id === d.id || link.target.id === d.id) ? "#E9C46A" : "#999")
                    .attr("stroke-opacity", link => (link.source.id === d.id || link.target.id === d.id) ? 1 : 0.2);
            })
            .on("mouseout", () => {
                link
                    .attr("stroke", "#999")
                    .attr("stroke-opacity", 0.6);
            });

            // Add labels inside the nodes
            const label = svg.append("g")
            .selectAll("text")
            .data(nodes)
            .enter().append("text")
            .attr("class", "label")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle") 
            .text(d => d.id)
            .style("font-size", d => `${Math.max(8, Math.sqrt(d.size)/4)}px`) // Adjust font size based on size (mentions)
            .style("font-family", "Arial, sans-serif")
            .style("fill", "white");

            simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            label
                .attr("x", d => d.x)
                .attr("y", d => d.y);
            });


            function drag(simulation) {
                function dragstarted(event, d) {
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                }

                function dragged(event, d) {
                    d.fx = event.x;
                    d.fy = event.y;
                }

                function dragended(event, d) {
                    if (!event.active) simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                }

                return d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended);
            }
        });
    }, []);    

    return <svg ref={svgRef}></svg>;
};

export default NetworkDiagram;