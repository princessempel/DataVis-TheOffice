import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import "./CharacterProfiles.css"; // For styling
import LollipopChart from "./LollipopChart";
// import characterData from "./data/character_data.json"

import GroupedScatterPlot from "./GroupedScatterPlot";

const DonutChart = ({ emotions, size, profileImage }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const width = size;
        const height = size;
        const innerRadius = size / 3;
        const outerRadius = size / 2;

        const emotionColors = {
            joy: "#FFD700",      // Gold
            sadness: "#1E90FF",  // Dodger Blue
            anger: "#FF4500",    // Orange Red
            love: "#FF69B4",     // Hot Pink
            fear: "#8A2BE2",     // Blue Violet
            surprise: "#32CD32"  // Lime Green
        };
        const color = d3.scaleOrdinal().domain(Object.keys(emotionColors)).range(Object.values(emotionColors));

        const pie = d3.pie().value((d) => d.value);
        const arc = d3.arc().innerRadius(innerRadius+15).outerRadius(outerRadius);

        const svg = d3.select(chartRef.current)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        const data = pie(Object.entries(emotions).map(([key, value]) => ({ emotion: key, value: value })));

        // Append arcs
        svg.selectAll("path")
            .data(data)
            .join("path")
            .attr("d", arc)
            .attr("fill", (d) => color(d.data.emotion))
            .on("mouseover", (e, d) => {
                const percentage = (d.data.value * 100).toFixed(2);
                d3.select("#tooltip")
                    .style("visibility", "visible")
                    .text(`${d.data.key}: ${percentage}%`);
            })
            .on("mousemove", (e) => {
                d3.select("#tooltip")
                    .style("top", `${e.pageY + 10}px`)
                    .style("left", `${e.pageX + 10}px`);
            })
            .on("mouseout", () => {
                d3.select("#tooltip").style("visibility", "hidden");
            });

        // Cleanup the SVG when the component unmounts
        return () => svg.selectAll("*").remove();
    }, [emotions, size]);

    return (
        <svg ref={chartRef}>
            <foreignObject
                x={0}
                y={5}
                width={size}
                height={size}>
                <img
                    src={profileImage}
                    alt="Character"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        borderRadius: "50%",
                    }}
                />
            </foreignObject>
        </svg>
    );
};

const characters = [
    { name: "Michael Scott", image: require("./profileImages/MichaelScott.png"), emotions: { joy: 0.466438434, sadness: 0.071970253, anger: 0.344800219, fear: 0.020199883, love: 0.0844876, surprise: 0.012103612 } },
    { name: "Dwight Schrute", image: require("./profileImages/DwightSchrute.png"), emotions: { joy: 0.388667557, sadness: 0.069574263, anger: 0.411603025, fear: 0.014843683, love: 0.105114591, surprise: 0.01019688 } },
    { name: "Pam Beesly Halpert", image: require("./profileImages/PamHalpert.png"), emotions: { joy: 0.450944175, sadness: 0.068251333, anger: 0.342503573, fear: 0.019304158, love: 0.103557375, surprise: 0.015439385 } },
    { name: "Jim Halpert", image: require("./profileImages/JimHalpert.png"), emotions: { joy: 0.463036269, sadness: 0.062399299, anger: 0.346737312, fear: 0.016387919, love: 0.097088726, surprise: 0.014350475 } },
    { name: "Kelly Kapoor", image: require("./profileImages/KellyKapoor.png"), emotions: { joy: 0.376939131, sadness: 0.080539149, anger: 0.396492866, fear: 0.041288186, love: 0.090963469, surprise: 0.013777198 } },
    { name: "Phyllis Vance", image: require("./profileImages/PhyllisVance.png"), emotions: { joy: 0.402087055, sadness: 0.073935724, anger: 0.384863636, fear: 0.02094551, love: 0.107788617, surprise: 0.010379459 } },
    { name: "Andy Bernard", image: require("./profileImages/AndyBernard.png"), emotions: { joy: 0.440588585, sadness: 0.066457121, anger: 0.367297228, fear: 0.023907462, love: 0.087705656, surprise: 0.014043946 }  },
    { name: "Darryl Philbin", image: require("./profileImages/DarrylPhilbin.png"), emotions: { joy: 0.439199728, sadness: 0.064841982, anger: 0.388986438, fear: 0.016462343, love: 0.082595213, surprise: 0.007914294 }  },
    { name: "Oscar Martinez", image: require("./profileImages/OscarMartinez.png"), emotions: { joy: 0.394584763, sadness: 0.060529998, anger: 0.412350691, fear: 0.015473564, love: 0.104672468, surprise: 0.012388512 }  },
    { name: "Angela Martin", image: require("./profileImages/AngelaMartin.png"), emotions: { joy: 0.358031604, sadness: 0.074238793, anger: 0.441083352, fear: 0.015958458, love: 0.103606892, surprise: 0.007080901 } },
    { name: "Ryan Howard", image: require("./profileImages/RyanHoward.png"), emotions: { joy: 0.447031588, sadness: 0.06399737, anger: 0.365699833, fear: 0.017386655, love: 0.091396884, surprise: 0.014487674 } },
    { name: "Erin Hannon", image: require("./profileImages/ErinHannon.png"), emotions: { joy: 0.425117376, sadness: 0.081007628, anger: 0.353773224, fear: 0.023039392, love: 0.10359514, surprise: 0.013467239 } },
    { name: "Toby Flenderson", image: require("./profileImages/TobyFlenderson.png"), emotions: { joy: 0.421236173, sadness: 0.071321745, anger: 0.37417206, fear: 0.015128668, love: 0.103307552, surprise: 0.014833803 } },
    { name: "Stanley Hudson", image: require("./profileImages/StanleyHudson.png"), emotions: { joy: 0.34674345, sadness: 0.072927782, anger: 0.447728791, fear: 0.015825834, love: 0.107619549, surprise: 0.009154591 } },
    { name: "Kevin Malone", image: require("./profileImages/KevinMalone.png"), emotions: { joy: 0.39365986, sadness: 0.065010759, anger: 0.40902604, fear: 0.022412631, love: 0.094109975, surprise: 0.015780734 } },
    { name: "Creed Bratton", image: require("./profileImages/CreedBratton.png"), emotions: { joy: 0.423638023, sadness: 0.067134259, anger: 0.382926363, fear: 0.022616633, love: 0.093765561, surprise: 0.00991916 } },
    { name: "Meredith Palmer", image: require("./profileImages/MeredithPalmer.png"), emotions: { joy: 0.334157035, sadness: 0.08497549, anger: 0.444194952, fear: 0.02579253, love: 0.085855605, surprise: 0.02502439 }  },
];

const CharacterProfile = ({ csvFilePath, jsonFilePath }) => {
    const [clickedCharacter, setClickedCharacter] = useState(null);
    const [hoveredCharacter, setHoveredCharacter] = useState(null);
    const [data, setData] = useState([]); // State to store the dataset
    const [characterData, setCharacterData] = useState({}); // For JSON data


    useEffect(() => {
        d3.csv(csvFilePath).then((rawData) => {
            const processedData = rawData
                .map((d) => ({
                    season: +d.season,
                    episode: d.episode_number === "" ? null : +d.episode_number,
                    title: d.episode_title,
                    scaled_ratings: +d.scaled_ratings,
                    lines: {
                        Michael: +d.Michael_lines,
                        Dwight: +d.Dwight_lines,
                        Pam: +d.Pam_lines,
                        Jim: +d.Jim_lines,
                        Kelly: +d.Kelly_lines,
                        Phyllis: +d.Phyllis_lines,
                        Andy: +d.Andy_lines,
                        Darryl: +d.Darryl_lines,
                        Oscar: +d.Oscar_lines,
                        Angela: +d.Angela_lines,
                        Ryan: +d.Ryan_lines,
                        Erin: +d.Erin_lines,
                        Toby: +d.Toby_lines,
                        Stanley: +d.Stanley_lines,
                        Kevin: +d.Kevin_lines,
                        Creed: +d.Creed_lines,
                        Meredith: +d.Meredith_lines,
                    },
                    scenes: {
                        Michael: +d.Michael_scenes,
                        Dwight: +d.Dwight_scenes,
                        Pam: +d.Pam_scenes,
                        Jim: +d.Jim_scenes,
                        Kelly: +d.Kelly_scenes,
                        Phyllis: +d.Phyllis_scenes,
                        Andy: +d.Andy_scenes,
                        Darryl: +d.Darryl_scenes,
                        Oscar: +d.Oscar_scenes,
                        Angela: +d.Angela_scenes,
                        Ryan: +d.Ryan_scenes,
                        Erin: +d.Erin_scenes,
                        Toby: +d.Toby_scenes,
                        Stanley: +d.Stanley_scenes,
                        Kevin: +d.Kevin_scenes,
                        Creed: +d.Creed_scenes,
                        Meredith: +d.Meredith_scenes,
                    }
                }))
                .filter((d) => d.episode !== null); // Exclude rows with null episodes
            setData(processedData);
        });
    }, [csvFilePath]);
    // Load character-specific data
    useEffect(() => {
        d3.json(jsonFilePath).then((jsonData) => {
            setCharacterData(jsonData);
        });
    }, [jsonFilePath]);

    const handleMouseEnter = (character) => {
        setHoveredCharacter(character);
    };

    const handleMouseLeave = () => {
        setHoveredCharacter(null);
    };

    const handleClick = (character) => {
        setClickedCharacter(character);
    };

    const handleCloseModal = () => {
        setClickedCharacter(null);
    };

    return (
        <div className="character-container">
            <div id="tooltip"></div> {/* Tooltip for the lollipop chart */}
            {characters.map((character, index) => (
                <div
                    key={index}
                    className="card-front">
                    <div
                        className="circle"
                        onMouseEnter={() => handleMouseEnter(character)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(character)}
                    > 
                    <DonutChart
                        emotions={character.emotions}
                        size={150}
                        profileImage={character.image}
                    />
                    </div>


                    {hoveredCharacter === character && (
                        <div className="character-name">
                            <p>{character.name}</p>
                        </div>
                    )}
                </div>
            ))}

            {clickedCharacter && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={handleCloseModal}>
                            X
                        </button>

                        <div className="text-section">
                            <img src={clickedCharacter.image} alt={clickedCharacter.name} />
                            <h2>{clickedCharacter.name}</h2>
                            <h3><strong>Role(s):</strong> <span>{characterData[clickedCharacter.name.split(" ")[0]].Role}</span></h3>

                            <p><strong>Total Episodes:</strong> {characterData[clickedCharacter.name.split(" ")[0]].total_episodes_appeared}</p>

                            <p><strong>Notable Quotes:</strong>
                                <ul>
                                    {characterData[clickedCharacter.name.split(" ")[0]].notable_quotes.map((quote, i) => (
                                        <li key={i}>"{quote}"</li>
                                    ))}
                                </ul></p>
                        </div>




                        <div className="chart-section">
                            <div className="lollipop-chart-container">
                                <LollipopChart
                                    data={data
                                        .map((episode) => ({
                                            season: episode.season,
                                            episode: episode.episode,
                                            lines: episode.lines[clickedCharacter.name.split(" ")[0]],
                                            title: episode.title,
                                        }))
                                        .filter((d) => d.episode != null)}
                                />
                            </div>
                        </div>
                        <div className="text-section">
                            <p><strong>Top 5 Episodes:</strong></p>
                            <ul>
                                {characterData[clickedCharacter.name.split(" ")[0]].top_episodes.map((episode, i) => (
                                    <li key={i}>
                                        {episode.episode}: <i>{episode.episode_title}</i>
                                    </li>
                                ))}
                            </ul>
                            <p><strong>First Line:</strong> {characterData[clickedCharacter.name.split(" ")[0]].first_line}</p>
                            <p><strong>Last Line:</strong> {characterData[clickedCharacter.name.split(" ")[0]].last_line}</p>
                        </div>
                        <div className="chart-section">
                            <div className="grouped-scatterplot-container">
                                <GroupedScatterPlot
                                    data={data
                                        .map((episode) => ({
                                            season: episode.season, // Bubble color based on seasons
                                            episode: episode.episode, // X-axis: Episode number
                                            scaled_ratings: episode.scaled_ratings, // Y-axis: Scaled ratings
                                            scenes: episode.scenes[clickedCharacter.name.split(" ")[0]], // Bubble size based on scenes
                                            title: episode.title,
                                        }))
                                        .filter((d) => d.scenes > 0)
                                    }
                                />

                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default CharacterProfile;
