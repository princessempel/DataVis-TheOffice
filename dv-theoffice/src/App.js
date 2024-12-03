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
      <h2 style={{paddingLeft: "40px"}}>Chart Insights</h2>
      <div className="container" style={{paddingTop: "0px", paddingBottom: "0px"}}>
        <div className="insight-item" style={{height: "200px"}}>
          <h3>Stress Relief (Season 5, Episode 77)</h3>
          <p>
            Has the highest viewership with 22.91 million and is generally one of the highly rated episodes of the entire show...
          </p>
        </div>
        <div className="insight-item" style={{height: "200px"}}>
          <h3>Goodbye, Michael (Season 7, Episode 137)</h3>
          <p>
            Aside from the series finale, this episode has the highest ratings with a 9.8. For many fans, his farewell was not just the end of his character’s journey but also the end of the show’s original essence. It marked a significant turning point for <i>The Office</i> as Michael was the heart of the show, bringing a unique mix of humor, awkwardness, and heartfelt moments. His exit left a void that no subsequent character or storyline fully filled, fundamentally changing the dynamic of the series.
          </p>
        </div>
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
      <h2 style={{paddingLeft: "40px"}}>Network Insights</h2>
      <div className="container" style={{paddingTop: "0px", paddingBottom: "0px"}}>
        <div className="insight-item" style={{height: "200px"}}>
          <h3>Michael Scott</h3>
          <p>
            Michael’s high interaction mentions with characters like Pam, Jim, and Dwight reflect his narrative dominance. His connections to minor characters, like Todd Packer, while fewer, often introduce chaos or comedy, showing his role as a disruptor. 
          </p>
        </div>
        <div className="insight-item" style={{height: "200px"}}>
          <h3>Dwight Schrute</h3>
          <p>
            For Dwight, initial seasons highlight interactions mostly with Michael and Jim. His thickest edge with Michael indicates Michael’s complex mentorship of Dwight, oscillating between ridicule and affection. However, later seasons show growing mentions with Angela and Andy, reflecting his expanded leadership and personal storylines. 
          </p>
        </div>
      </div>
      <div className="insight-item">
        <h3>Michael and Pam</h3>
        <p>
          Michael Scott and Pam Beesly share one of the most nuanced and underappreciated relationships in <i>The Office</i>, which is reflected in the network. It evolves significantly over the series, offering moments of unexpected emotional depth and mutual respect. Early interactions reveal Michael’s immaturity and inability to recognize Pam as more than just “the receptionist.” Pam, in turn, shows patience, hinting at the seeds of their later bond. As Michael matures, Pam becomes a surprising source of emotional support. Their relationship evolves into one of quiet mutual respect.
        </p>
      </div>
      <br/><br/>
      <div className="CharacterProfile">
        {/* <header className="section-header">
          <h1>
            <i>The Office</i> Character Profiles
          </h1>
        </header> */}
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