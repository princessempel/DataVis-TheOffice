import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const NetworkDiagram = ({ filter }) => {
    const svgRef = useRef();

    useEffect(() => {
        const margin = { top: 0, right: 20, bottom: 0, left: 20 };
        const width = 1000 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;

        // Clear SVG before re-rendering
        d3.select(svgRef.current).selectAll("*").remove();

        // Responsive SVG (scales based on window size)
        const svg = d3.select(svgRef.current)
            .attr("width", "100%")
            .attr("height", "100%")
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
            // Initialize aggregated edges
            const aggregatedEdges = {};

            // Filter and aggregate mentions dynamically
            edges.forEach(edge => {
                const forwardKey = `${edge.source}->${edge.target}`;
                const reverseKey = `${edge.target}->${edge.source}`;
                const pairKey = [edge.source, edge.target].sort().join("-");

                if (!aggregatedEdges[pairKey]) {
                    aggregatedEdges[pairKey] = {
                        source: edge.source,
                        target: edge.target,
                        total_mentions: 0,
                        breakdown: {
                            [forwardKey]: 0,
                            [reverseKey]: 0
                        }
                    };
                }

                // Determine mentions based on filter
                let mentions = 0;
                if (filter === "all") {
                    mentions = edge.mentions;
                } else {
                    const season = filter.split("-")[1];
                    const episode = filter.split("-")[3];
                    if (!episode) {
                        mentions = edge.season_mentions[season] || 0; // Mentions for season
                    } else {
                        const episodeKey = `season-${season}-episode-${episode}`;
                        mentions = edge.episode_mentions[episodeKey] || 0; // Mentions for episode
                    }
                }

                // Update the breakdown based on direction
                aggregatedEdges[pairKey].breakdown[forwardKey] += mentions;
                aggregatedEdges[pairKey].total_mentions += mentions;
            });

            // Convert aggregated edges to an array and filter out edges with zero mentions
            const updatedEdges = Object.values(aggregatedEdges).filter(edge => edge.total_mentions > 0);

            // Filter nodes to include only those connected in the filtered edges
            const connectedNodes = new Set();
            updatedEdges.forEach(edge => {
                connectedNodes.add(edge.source);
                connectedNodes.add(edge.target);
            });

            const filteredNodes = nodes.filter(node => connectedNodes.has(node.id));

            // Calculate node importance (mentions)
            const nodeMentions = {};
            updatedEdges.forEach(edge => {
                nodeMentions[edge.source] = (nodeMentions[edge.source] || 0) + edge.total_mentions;
                nodeMentions[edge.target] = (nodeMentions[edge.target] || 0) + edge.total_mentions;
            });

            filteredNodes.forEach(node => {
                node.size = nodeMentions[node.id] || 1; // Default size if no mentions
            });

            // Create the simulation
            const simulation = d3.forceSimulation(filteredNodes)
                .force("link", d3.forceLink(updatedEdges).id(d => d.id).distance(150))
                .force("charge", d3.forceManyBody().strength(-800))
                .force("center", d3.forceCenter(width / 2, height / 2));

            // Draw links
            const link = svg.append("g")
                .selectAll("line")
                .data(updatedEdges)
                .enter().append("line")
                .attr("stroke", "#999")
                .attr("stroke-opacity", 0.6)
                .attr("stroke-width", d => Math.sqrt(d.total_mentions)); // Weighted by total mentions

            // Tooltip for edges
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
                const breakdownHtml = Object.entries(d.breakdown)
                    .map(([direction, count]) => `${direction}: ${count}`)
                    .join("<br>");

                tooltip
                    .style("display", "block")
                    .html(`
                        <strong>${d.source.id} <-> ${d.target.id}</strong> <br> 
                        Total Mentions: ${d.total_mentions}<br><br>
                        <strong>Breakdown:</strong><br>${breakdownHtml}
                    `);

                d3.select(event.target).attr("stroke", "#FFF").attr("stroke-opacity", 1);
            })
            .on("mousemove", (event) => {
                tooltip
                    .style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY + 10}px`);
            })
            .on("mouseout", (event) => {
                tooltip.style("display", "none");
                d3.select(event.target).attr("stroke", "#999").attr("stroke-opacity", 0.6);
            });

            // Draw nodes
            const node = svg.append("g")
            .selectAll("circle")
            .data(filteredNodes)
            .enter().append("circle")
            .attr("r", d => Math.sqrt(d.size/2) + 8) // Node size by mentions
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
            .data(filteredNodes)
            .enter().append("text")
            .attr("class", "label")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle") 
            .text(d => d.id)
            .style("font-size", d => `${Math.max(12, Math.sqrt(d.size)/4)}px`) // Adjust font size based on size (mentions)
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
    }, [filter]);    

    return <svg ref={svgRef}></svg>;
};

export default NetworkDiagram;