import React, { useState } from "react";
import './App.css';
import LineXStackedBarChart from './LineXStackedBarChart';
import CharacterProfile from "./CharacterProfiles";

function App() {
  const [dataKey, setDataKey] = useState("ratings");
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
      <header className="App-header">
        <p>
          (CS 6730) Data Vis Project: Return to <i>The Office</i>
        </p>
      </header>
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
            Viewership (in Millions)
          </button>
        </div>
        <text style={{ alignSelf: "center", justifySelf: "center", color: "white", fontWeight: "bold" }}>per Episode in Each Season</text>
        <LineXStackedBarChart
          csvFilePath={"data/the_office_episodes_processed.csv"}
          dataKey={dataKey}
          yAxisLabel={getYAxisLabel()}
        />
      </div>
      <div className="CharacterProfile">
        <header className="Profile-header">
          <p>
            <i>The Office</i> Character Profiles
          </p>
        </header>
        <CharacterProfile
          csvFilePath={"data/combined_dataset.csv"}
        />
      </div>

    </div>
  );
}

export default App;
