import React, { useState } from "react";
import './App.css';
import LineXStackedBarChart from './LineXStackedBarChart';
import CharacterProfile from "./CharacterProfiles";
import NetworkDiagram from "./NetworkDiagram";

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
      <div className="network-diagram">
        <h1>Network Diagram</h1>
        <p>based on how many times the characters mention each others' character names/aliases (total between them)</p>
        <NetworkDiagram /> 
        <p>TO-DO: Show network diagram based on season and/or episode</p>
        <p>TO-DO: Tooltip or another indicator on links/nodes to show the split (who mentioned who more)</p>
        <p>another potential option could be based on scene/sequential dialogue (TBD)</p>
      </div>
      <div className="CharacterProfile">
        <header className="section-header">
          <h1>
            <i>The Office</i> Character Profiles
          </h1>
        </header>
        <CharacterProfile
          csvFilePath={"/DataVis-TheOffice/data/combined_dataset.csv"}
          jsonFilePath={"/DataVis-TheOffice/data/character_data.json"}
        />
      </div>

    </div>
  );
}

export default App;
