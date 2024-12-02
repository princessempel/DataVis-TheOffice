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
                        const epSeason = epKey.split("-")[1];
                        const epEpisode = epKey.split("-")[3];
                        if (epSeason === season) {
                            const episodeKey = `season-${epSeason}-episode-${epEpisode}`;
                            treeStructure[seasonKey][episodeKey] = true;
                        }
                    });
                });
            });

            const dropdownData = [
                {
                    label: "Entire Show",
                    value: "all",
                    children: Object.keys(treeStructure).map(seasonKey => ({
                        label: seasonKey.replace("season-", "Season "),
                        value: seasonKey,
                        children: Object.keys(treeStructure[seasonKey]).map(epKey => ({
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

    // const handleToggle = (state) => {
    //     setExpanded(state); // Update expanded state
    // };

    return (
        <div
            // aria-hidden={!expanded} // Dynamically apply aria-hidden
            // role="combobox"
            // aria-expanded={expanded}
        >
            <DropdownTreeSelect
                data={treeData}
                onChange={handleChange}
                texts={{ placeholder: "Filter by Season or Episode" }}
                value={selectedValue ? [{ label: selectedValue, value: selectedValue }] : []}
                keepOpenOnSelect={true}
                // mode="radioSelect"
                // onAction={(action, node) => {
                //     if (action === "expand") handleToggle(true);
                //     if (action === "collapse") handleToggle(false);
                // }}
            />
        </div>
    );
};

export default TreeDropdown;
