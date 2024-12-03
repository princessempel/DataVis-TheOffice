import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./CharacterProfiles.css"; // For styling
import LollipopChart from "./LollipopChart";
// import characterData from "./data/character_data.json"

import GroupedScatterPlot from "./GroupedScatterPlot";

const characters = [
    { name: "Michael Scott", image: require("./profileImages/MichaelScott.png"), donutChart: require("./donutCharts/Michael_donut.png"), },
    { name: "Dwight Schrute", image: require("./profileImages/DwightSchrute.png"), donutChart: require("./donutCharts/Dwight_donut_chart.png"),},
    { name: "Pam Beesly Halpert", image: require("./profileImages/PamHalpert.png"), donutChart: require("./donutCharts/Pam_donut_chart.png")},
    { name: "Jim Halpert", image: require("./profileImages/JimHalpert.png"), donutChart: require("./donutCharts/Jim_donut_chart.png")},
    { name: "Kelly Kapoor", image: require("./profileImages/KellyKapoor.png"), donutChart: require("./donutCharts/Kelly_donut_chart.png") },
    { name: "Phyllis Vance", image: require("./profileImages/PhyllisVance.png"), donutChart: require("./donutCharts/Phyllis_donut_chart.png") },
    { name: "Andy Bernard", image: require("./profileImages/AndyBernard.png"), donutChart: require("./donutCharts/Andy_donut.png") },
    { name: "Darryl Philbin", image: require("./profileImages/DarrylPhilbin.png"), donutChart: require("./donutCharts/Darryl_donut_chart.png") },
    { name: "Oscar Martinez", image: require("./profileImages/OscarMartinez.png"), donutChart: require("./donutCharts/Oscar_donut_chart.png") },
    { name: "Angela Martin", image: require("./profileImages/AngelaMartin.png"), donutChart: require("./donutCharts/Angela_donut_chart.png") },
    { name: "Ryan Howard", image: require("./profileImages/RyanHoward.png"), donutChart: require("./donutCharts/Ryan_donut_chart.png") },
    { name: "Erin Hannon", image: require("./profileImages/ErinHannon.png"), donutChart: require("./donutCharts/Erin_donut_chart.png") },
    { name: "Toby Flenderson", image: require("./profileImages/TobyFlenderson.png"), donutChart: require("./donutCharts/Toby_donut_chart.png") },
    { name: "Stanley Hudson", image: require("./profileImages/StanleyHudson.png"), donutChart: require("./donutCharts/Stanley_donut_chart.png") },
    { name: "Kevin Malone", image: require("./profileImages/KevinMalone.png"), donutChart: require("./donutCharts/Kevin_donut_chart.png") },
    { name: "Creed Bratton", image: require("./profileImages/CreedBratton.png"), donutChart: require("./donutCharts/Creed_donut_chart.png") },
    { name: "Meredith Palmer", image: require("./profileImages/MeredithPalmer.png"), donutChart: require("./donutCharts/Meredith_donut.png") },
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
                    {/* Donut Chart as Background */}
                    {character.donutChart && (
                        <img src={character.donutChart} alt={'${character.name} Emotion Donut'} className="donut-chart" />
                    )}

                    {/*Profile Picture*/}
                    <img src={character.image} alt={character.name} className="profile-picture" />
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
