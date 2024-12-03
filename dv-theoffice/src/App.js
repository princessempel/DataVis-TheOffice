import React, { useState } from "react";
import './App.css';
import LineXStackedBarChart from './LineXStackedBarChart';
// import CharacterProfile from "./CharacterProfiles";
import NetworkDiagram from "./NetworkDiagram";
import TreeDropdown from "./TreeDropdown";
// import CharacterMetrics from "./CharacterMetrics";
import ProfileInsights from "./ProfileInsights";
import TextAnalysis from "./TextAnalysis";
import TextAnalysisHeatMap from "./TextAnalysisHeatMap";
import CharacterDropdown from "./CharacterDropdown";
import CharacterNetworkDiagram from "./CharacterNetworkDiagram";
import introImage from './assets/hero-image.jpeg';

function App() {
  const [dataKey, setDataKey] = useState("ratings");
  const [filter, setFilter] = useState("all");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [viewOption, setViewOption] = useState("");

  const getYAxisLabel = () => {
    switch (dataKey) {
      case "ratings":
        return "Ratings";
      case "scaled_ratings":
        return "Scaled Ratings";
      case "viewership_mil":
        return "Viewership (in Millions)";
      default:
        return "";
    }
  };

  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <div className="hero">
          <div className="hero-content">
            <h1>Analyzing the Antics</h1>
            <h2>Data Insights from <i>The Office</i></h2>
            <p>(CS 6730) Data Visualization Project</p>
          </div>
      </div>
      <br/><br/>
      <div class="container">
      <div class="text">
        <p>
          (Placeholder Text)
          Dive into the data behind Dunder Mifflin! Discover fun insights and visualizations from the hit show *The Office*. 
        </p>
        </div>
        <div class="image">
          <img src={introImage} alt="The Office" />
        </div>
      </div>
      <div className="linebarchart-container">
        <TextAnalysis />
      </div>
      <div className="linebarchart-container">
        <TextAnalysisHeatMap />
      </div>
      <div className="linebarchart-container">
        <div className="toggle-buttons">
          <button
            className={dataKey === "ratings" ? "active" : ""}
            onClick={() => setDataKey("ratings")}
          >
            Ratings
          </button>
          <button
            className={dataKey === "scaled_ratings" ? "active" : ""}
            onClick={() => setDataKey("scaled_ratings")}
          >
            Scaled Ratings
          </button>
          <button
            className={dataKey === "viewership_mil" ? "active" : ""}
            onClick={() => setDataKey("viewership_mil")}
          >
            <span>Viewership</span><br></br>
            <span>(in Millions)</span>
          </button>
        </div>
        {/* <span style={{ alignSelf: "center", justifySelf: "center", color: "white", fontWeight: "bold" }}>per Episode in Each Season</span> */}
        <h1>per Episode in Each Season</h1>
        <LineXStackedBarChart
          csvFilePath={"/DataVis-TheOffice/data/the_office_episodes_processed.csv"}
          dataKey={dataKey}
          yAxisLabel={getYAxisLabel()}
        />
      </div>
      <div>
        <h1>Network Diagram</h1>
        {/* <p>based on how many times the characters mention each others' character names/aliases (total between them)</p> */}
        <h2>Do you want to see interaction by: </h2>
        {/* Options for users to choose */}
        <div className="view-options">
          <button
            className={viewOption === "seasons" ? "active" : ""}
            onClick={() => setViewOption("seasons")}
          >
            Seasons/Episodes
          </button>
          <button
            className={viewOption === "characters" ? "active" : ""}
            onClick={() => setViewOption("characters")}
          >
            Characters
          </button>
        </div>
        {/* Conditional Rendering */}
        {viewOption === "seasons" && (
          <div>
            <p>based on how many times the characters mention each others' character names/aliases (total between them)</p>
            <TreeDropdown onSelect={setFilter} />
            <NetworkDiagram filter={filter} />
          </div>
        )}
        {viewOption === "characters" && (
          <div>
            <CharacterDropdown onSelect={setSelectedCharacter} />
            {selectedCharacter ? (
              <CharacterNetworkDiagram selectedCharacter={selectedCharacter} />
            ) : (
              <p>Please select a character to view their interactions.</p>
            )}
          </div>
        )}
      </div>
      <div className="CharacterProfile linebarchart-container">
        <header className="section-header">
          <h1>
            <i>The Office</i> Character Profiles
          </h1>
        </header>
        <div className="insights">
          <ProfileInsights />
        </div>
        {/* <CharacterProfile
          csvFilePath={"/DataVis-TheOffice/data/combined_dataset.csv"}
          jsonFilePath={"/DataVis-TheOffice/data/character_data.json"}
        /> */}
      </div>

    </div>
  );
}

export default App;