import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./CharacterProfiles.css"; // For styling
import LollipopChart from "./LollipopChart";

const characters = [
    { name: "Michael Scott", image: require("./profileImages/MichaelScott.png") },
    { name: "Dwight Schrute", image: require("./profileImages/DwightSchrute.png") },
    { name: "Pam Beesly Halpert", image: require("./profileImages/PamHalpert.png") },
    { name: "Jim Halpert", image: require("./profileImages/JimHalpert.png") },
    { name: "Kelly Kapoor", image: require("./profileImages/KellyKapoor.png") },
    { name: "Phyllis Vance", image: require("./profileImages/PhyllisVance.png") },
    { name: "Andy Bernard", image: require("./profileImages/AndyBernard.png") },
    { name: "Darryl Philbin", image: require("./profileImages/DarrylPhilbin.png") },
    { name: "Oscar Martinez", image: require("./profileImages/OscarMartinez.png") },
    { name: "Angela Martin", image: require("./profileImages/AngelaMartin.png") },
    { name: "Ryan Howard", image: require("./profileImages/RyanHoward.png") },
    { name: "Erin Hannon", image: require("./profileImages/ErinHannon.png") },
    { name: "Toby Flenderson", image: require("./profileImages/TobyFlenderson.png") },
    { name: "Stanley Hudson", image: require("./profileImages/StanleyHudson.png") },
    { name: "Kevin Malone", image: require("./profileImages/KevinMalone.png") },
    { name: "Creed Bratton", image: require("./profileImages/CreedBratton.png") },
];

const CharacterProfile = ({ csvFilePath }) => {
    const [clickedCharacter, setClickedCharacter] = useState(null);
    const [hoveredCharacter, setHoveredCharacter] = useState(null);
    const [data, setData] = useState([]); // State to store the dataset

    useEffect(() => {
        d3.csv(csvFilePath).then((rawData) => {
            const processedData = rawData
                .map((d) => ({
                    season: +d.season,
                    episode: d.episode_number === "" ? null : +d.episode_number,
                    title: d.episode_title,
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
                    },
                }))
                .filter((d) => d.episode !== null); // Exclude rows with null episodes
            setData(processedData);
        });
    }, [csvFilePath]);

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
                    > <img src={character.image} alt={character.name} />

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
                        <img src={clickedCharacter.image} alt={clickedCharacter.name} />
                        <h2>{clickedCharacter.name}</h2>
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
                </div>
            )}
        </div>
    );
};

export default CharacterProfile;
