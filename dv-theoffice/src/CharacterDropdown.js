import React, { useEffect, useState } from "react";
import './CharacterDropdown.css'

const CharacterDropdown = ({ onSelect }) => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            const response = await fetch("/DataVis-TheOffice/data/network_nodes.json");
            const nodes = await response.json();

            // Extract character IDs from the nodes array
            const characterNames = nodes.map(node => node.id);

            setCharacters(characterNames);
        };

        fetchCharacters();
    }, []);

    const handleSelect = (event) => {
        const selectedCharacter = event.target.value;
        onSelect(selectedCharacter); // Pass the selected character to the parent
    };

    return (
        <div className="dropdown">
            <label htmlFor="character-select">Select a Character: </label>
            <select id="character-select" onChange={handleSelect} defaultValue="">
                <option value="" disabled>
                    Select a character
                </option>
                <option value="clear">Clear</option> {/* Clear option */}
                {characters.map((character) => (
                    <option key={character} value={character}>
                        {character}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CharacterDropdown;