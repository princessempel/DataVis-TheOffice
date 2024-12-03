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
  const [viewOption, setViewOption] = useState("seasons");

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
      {/* <div className="linebarchart-container"> */}
      <TextAnalysis />
      {/* <div className="linebarchart-container"> */}
        <TextAnalysisHeatMap />
      {/* </div> */}
      {/* <div className="linebarchart-container"> */}
      <div className="container">
        <div className="text">
          <h1>Line Chart with Stacked Bars</h1>
          <h3>Best and Worst Episodes/Seasons</h3>
          <p>Explore which episodes were the most loved or hated, either across all time or by season, and see which ones drew the highest viewership. Did some episodes live up to the hype, while others fell short? Were there any surprising fan favorites?</p>
          <h3>View based on: </h3>
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
              <span> (in Millions)</span>
            </button>
          </div>
          <br/><br/>
        </div>
        
        
        {/* <span style={{ alignSelf: "center", justifySelf: "center", color: "white", fontWeight: "bold" }}>per Episode in Each Season</span> */}
        <LineXStackedBarChart
          csvFilePath={"/DataVis-TheOffice/data/the_office_episodes_processed.csv"}
          dataKey={dataKey}
          yAxisLabel={getYAxisLabel()}
        />
      </div>
      <div className="container">
        <div className="text">
          <h1>Network Diagram</h1>
          <h3>Who interacted with whom?</h3>
          <p>Discover how often different characters interacted throughout the show! Explore the network by timeline or focus on a specific character to dive deeper into their connections.</p>
          <h3>See interactions based on: </h3>
          {/* Options for users to choose */}
          <div className="toggle-buttons">
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
        </div>
        {/* Conditional Rendering */}
        {viewOption === "seasons" && (
          <div style={{flex: 1.25}}>
            <TreeDropdown onSelect={setFilter} />
            <NetworkDiagram filter={filter} />
          </div>
        )}
        {viewOption === "characters" && (
          <div style={{flex: 1.25,}}>
            <CharacterDropdown onSelect={setSelectedCharacter} />
            {selectedCharacter ? (
              <CharacterNetworkDiagram selectedCharacter={selectedCharacter} />
            ) : (
              <p>Please select a character to view their interactions.</p>
            )}
          </div>
        )}
      </div>
      <div className="CharacterProfile">
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