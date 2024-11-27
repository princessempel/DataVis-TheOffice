import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import './CharacterProfiles.css'; // For styling

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


const CharacterProfile = () => {
    const [clickedCharacter, setClickedCharacter] = useState(null);
    const [hoveredCharacter, setHoveredCharacter] = useState(null);

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
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CharacterProfile;

