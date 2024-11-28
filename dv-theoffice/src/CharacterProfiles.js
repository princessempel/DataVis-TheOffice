import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import './CharacterProfiles.css'; // For styling
import LollipopChart from "./LollipopChart";

const characters = [
    {
        name: 'Michael Scott',
        image: require('./profileImages/MichaelScott.png')
    },
    {
        name: 'Dwight Schrute',
        image: require('./profileImages/DwightSchrute.png')
    },
    {
        name: 'Pam Beesly Halpert',
        image: require('./profileImages/PamHalpert.png')
    },
    {
        name: 'Jim Halpert',
        image: require('./profileImages/JimHalpert.png')
    },
    {
        name: 'Kelly Kapoor',
        image: require('./profileImages/KellyKapoor.png')
    },
    {
        name: 'Phyllis Vance',
        image: require('./profileImages/PhyllisVance.png')
    },
    {
        name: 'Andy Bernard',
        image: require('./profileImages/AndyBernard.png')
    },
    {
        name: 'Darryl Philbin',
        image: require('./profileImages/DarrylPhilbin.png')
    },
    {
        name: 'Oscar Martinez',
        image: require('./profileImages/OscarMartinez.png')
    },
    {
        name: 'Angela Martin',
        image: require('./profileImages/AngelaMartin.png')
    },
    {
        name: 'Ryan Howard',
        image: require('./profileImages/RyanHoward.png')
    },
    {
        name: 'Erin Hannon',
        image: require('./profileImages/ErinHannon.png')
    },
    {
        name: 'Toby Flenderson',
        image: require('./profileImages/TobyFlenderson.png')
    },
    {
        name: 'Stanley Hudson',
        image: require('./profileImages/StanleyHudson.png')
    },
    {
        name: 'Kevin Malone',
        image: require('./profileImages/KevinMalone.png')
    },
    {
        name: 'Creed Bratton',
        image: require('./profileImages/CreedBratton.png')
    },
]


const CharacterProfile = ({ csvFilePath }) => {
    const [clickedCharacter, setClickedCharacter] = useState(null);
    const [hoveredCharacter, setHoveredCharacter] = useState(null);
    const [data, setData] = useState([]); // State to store the dataset

    // Fetch and process the dataset
    useEffect(() => {
        d3.csv(csvFilePath).then((rawData) => {
            console.log("rawData = ", rawData)
            const processedData = rawData.map((d) => ({
                season: +d.season,
                episode: d.episode_number === "" ? null : +d.episode_number, // Replace // Ensure consistency with naming
                ratings: +d.ratings,
                title: d.episode_title,
                scaled_ratings: +d.scaled_ratings,
                viewership_mil: +d.viewership_mil,
                Michael_lines: +d.Michael_lines,
                Dwight_lines: +d.Dwight_lines,
                Pam_lines: +d.Pam_lines,
                Jim_lines: +d.Jim_lines,
                Kelly_lines: +d.Kelly_lines,
                Phyllis_lines: +d.Phyllis_lines,
                Andy_lines: +d.Andy_lines,
                Darryl_lines: +d.Darryl_lines,
                Oscar_lines: +d.Oscar_lines,
                Angela_lines: +d.Angela_lines,
                Ryan_lines: +d.Ryan_lines,
                Erin_lines: +d.Erin_lines,
                Toby_lines: +d.Toby_lines,
                Stanley_lines: +d.Stanley_lines,
                Kevin_lines: +d.Kevin_lines,
                Creed_lines: +d.Creed_lines,
            }))
                .filter((d) => d.episode != null);
            console.log("processed data = ", processedData)
            setData(processedData);
        });
    }, []); // Empty dependency array ensures this runs only once OR should this be csvFilePath

    const handleMouseEnter = (character) => {
        setHoveredCharacter(character);
    };

    const handleMouseLeave = () => {
        setHoveredCharacter(null);
    };

    const handleClick = (character) => {
        setClickedCharacter(character);
    };

    const handleClose = () => {
        setClickedCharacter(null);
    };


    return (
        <div className="character-container">
            <div id="tooltip"></div> {/* Tooltip div */}
            {characters.map((character, index) => (
                <div
                    key={index}
                    className={`card-container ${clickedCharacter === character ? "flipped" : ""}`}
                    onMouseEnter={() => handleMouseEnter(character)}
                    onMouseLeave={handleMouseLeave}
                // onClick={() => handleClick(character)}
                >

                    {/* Front side (Circle Profile Image) */}
                    <div className="card-front">
                        <div className="circle"
                            onClick={() => handleClick(character)} // Move onClick here

                        >
                            <img src={character.image} alt={character.name} />
                        </div>
                        {hoveredCharacter === character && (
                            <div className="character-name">
                                <p>{character.name}</p>
                            </div>
                        )}
                    </div>

                    {/* Back side (Rectangle Profile Box) */}
                    <div className="card-back">
                        <div className="character-info-box">
                            <img src={character.image} alt={character.name} />
                            <p>{character.name}</p>
                            <button
                                className="close-button"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering the card's onClick event
                                    handleClose();
                                }}
                            >
                                X
                            </button>
                            {/* Render the lollipop chart */}
                            {clickedCharacter === character && (
                                // Debug the data being passed to the LollipopChart
                                <>
                                    {console.log(
                                        data.map((episode) => ({
                                            season: episode.season,
                                            episode_number: episode.episode, // Ensure correct mapping
                                            lines: episode[`${clickedCharacter.name.split(" ")[0]}_lines`],
                                        }))
                                            .filter((d) => d.lines > 0) // Only episodes where the character has lines
                                    )}
                                    <LollipopChart

                                        data={data
                                            // .filter((episode) => episode.episode === 0)
                                            .map((episode) => ({
                                                season: episode.season, // Season for coloring
                                                episode: episode.episode, // Episode for X-axis
                                                lines: episode[`${clickedCharacter.name.split(" ")[0]}_lines`], // Selected character's lines
                                                title: episode.title, // Episode title for tooltip
                                            }))
                                            .filter((d) => d.episode !== null)
                                            // .filter((d) => d.lines > 0)
                                        } // Only include episodes where the character has lines
                                    />
                                </>


                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CharacterProfile;

