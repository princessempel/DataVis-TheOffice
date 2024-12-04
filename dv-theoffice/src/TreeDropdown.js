import React, { useEffect, useState } from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";

const TreeDropdown = ({ onSelect }) => {
    const [treeData, setTreeData] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null); // Track selected value

    useEffect(() => {
        const fetchTreeData = async () => {
            const response = await fetch("/DataVis-TheOffice/data/network_edges.json");
            const edges = await response.json();

            const treeStructure = {};
            edges.forEach(edge => {
                Object.keys(edge.season_mentions).forEach(season => {
                    const seasonKey = `season-${season}`;
                    if (!treeStructure[seasonKey]) {
                        treeStructure[seasonKey] = {};
                    }
                    Object.keys(edge.episode_mentions).forEach(epKey => {
                        const [_, epSeason, __, epEpisode] = epKey.split("-");
                        if (epSeason === season) {
                            const episodeKey = `season-${epSeason}-episode-${epEpisode}`;
                            treeStructure[seasonKey][episodeKey] = true;
                        }
                    });
                });
            });

            // Sort the seasons and episodes
            const dropdownData = [
                {
                    label: "Entire Show",
                    value: "all",
                    children: Object.keys(treeStructure)
                        .sort((a, b) => parseInt(a.split("-")[1]) - parseInt(b.split("-")[1])) // Sort seasons numerically
                        .map(seasonKey => ({
                            label: seasonKey.replace("season-", "Season "),
                            value: seasonKey,
                            children: Object.keys(treeStructure[seasonKey])
                                .sort((a, b) => parseInt(a.split("-")[3]) - parseInt(b.split("-")[3])) // Sort episodes numerically
                                .map(epKey => ({
                                    label: epKey.replace("season-", "Season ").replace("-episode-", " Episode "),
                                    value: epKey
                                }))
                        }))
                }
            ];

            setTreeData(dropdownData);
        };

        fetchTreeData();
    }, []);

    const handleChange = (currentNode) => {
        if (currentNode.checked) {
            console.log(currentNode.value);
            setSelectedValue(currentNode.value); // Update the selected value
            onSelect(currentNode.value); // Notify parent component
        } else {
            setSelectedValue(null);
            onSelect("all"); // Default to 'all' on deselect
        }
    };

    return (
        <div 
            style={{alignItems: "center",
                justifyItems: "center"}}
        >
            <DropdownTreeSelect
                data={treeData}
                onChange={handleChange}
                texts={{ placeholder: "Select Season/Episode" }}
                value={selectedValue ? [{ label: selectedValue, value: selectedValue }] : []}
                keepOpenOnSelect={true}
                className="dropdown-tree-select-container" /* Add custom class */
            />
        </div>
    );
};

export default TreeDropdown;
