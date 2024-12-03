import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const CharacterNetworkDiagram = ({ selectedCharacter }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!selectedCharacter) return; // Do not render the diagram if no character is selected.

        const margin = { top: 0, right: 20, bottom: 0, left: 20 };
        const width = 1000 - margin.left - margin.right;
        const height = 800 - margin.top - margin.bottom;

        // Clear SVG before re-rendering
        d3.select(svgRef.current).selectAll("*").remove();

        // Responsive SVG
        const svg = d3.select(svgRef.current)
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
            .style("background-color", "#2A3C5F")
            .append("g");

        // Load nodes and edges JSON
        Promise.all([
            fetch("/DataVis-TheOffice/data/network_nodes.json").then(res => res.json()),
            fetch("/DataVis-TheOffice/data/network_edges.json").then(res => res.json())
        ]).then(([nodes, edges]) => {
            // Filter edges to include only those connected to the selected character
            const filteredEdges = edges.filter(
                edge => edge.source === selectedCharacter || edge.target === selectedCharacter
            );

            // Aggregate edges for each character pair
            const aggregatedEdges = {};
            filteredEdges.forEach(edge => {
                const pairKey = [edge.source, edge.target].sort().join("-");
                if (!aggregatedEdges[pairKey]) {
                    aggregatedEdges[pairKey] = {
                        source: edge.source,
                        target: edge.target,
                        total_mentions: 0,
                        breakdown: {
                            [`${edge.source}->${edge.target}`]: 0,
                            [`${edge.target}->${edge.source}`]: 0,
                        },
                    };
                }
                aggregatedEdges[pairKey].total_mentions += edge.mentions;
                aggregatedEdges[pairKey].breakdown[`${edge.source}->${edge.target}`] += edge.mentions;
            });

            // Convert aggregated edges to an array
            const consolidatedEdges = Object.values(aggregatedEdges);

            // Create a set of connected nodes
            const connectedNodes = new Set(
                consolidatedEdges.flatMap(edge => [edge.source, edge.target])
            );

            // Filter nodes to include only those in the connectedNodes set
            const filteredNodes = nodes.filter(node => connectedNodes.has(node.id));

            // Calculate mentions for node size
            const nodeMentions = {};
            consolidatedEdges.forEach(edge => {
                nodeMentions[edge.source] = (nodeMentions[edge.source] || 0) + edge.total_mentions;
                nodeMentions[edge.target] = (nodeMentions[edge.target] || 0) + edge.total_mentions;
            });

            filteredNodes.forEach(node => {
                node.size = nodeMentions[node.id] || 1; // Default size if no mentions
            });

            // Create the simulation
            const simulation = d3.forceSimulation(filteredNodes)
                .force("link", d3.forceLink(consolidatedEdges).id(d => d.id).distance(150))
                .force("charge", d3.forceManyBody().strength(-800))
                .force("center", d3.forceCenter(width / 2, height / 2));

            // Draw links
            const link = svg.append("g")
                .selectAll("line")
                .data(consolidatedEdges)
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
                        <strong>${d.source.id} <-> ${d.target.id}</strong><br>
                        <strong>Total Mentions:</strong> ${d.total_mentions}<br>
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
                .attr("fill", d => (d.id === selectedCharacter ? "#4BA8B2" : "steelblue"))
                .call(drag(simulation));

            // // Highlight edges connected to node on hover
            // node.on("mouseover", (event, d) => {
            //     link
            //         .attr("stroke", link => (link.source.id === d.id || link.target.id === d.id) ? "#E9C46A" : "#999")
            //         .attr("stroke-opacity", link => (link.source.id === d.id || link.target.id === d.id) ? 1 : 0.2);
            // })
            // .on("mouseout", () => {
            //     link
            //         .attr("stroke", "#999")
            //         .attr("stroke-opacity", 0.6);
            // });

            // Add labels inside the nodes
            const label = svg.append("g")
                .selectAll("text")
                .data(filteredNodes)
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
    }, [selectedCharacter]);    

    return <svg ref={svgRef}></svg>;
};

export default CharacterNetworkDiagram;