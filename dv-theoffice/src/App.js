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
        <h2>Insights</h2>
        1. Kelly: Lowest Average Word Length, Highest Average Sentence Length- She focuses on gossip, trends, and emotional outbursts, which don’t require sophisticated vocabulary. Kelly’s sentences are long because she tends to ramble, stringing together thoughts without pausing. 
        2. Meredith: Consistently Low Across All Metrics- Her dialogue is often short, to the point, and laced with humor or shock value, rather than linguistic complexity.
        3. Dwight: Highest Average Word Length- Dwight’s vocabulary often includes longer, more formal words because of his unique speech patterns.
        4. Oscar: Highest Syllables Per Word- Oscar’s role as "the smart one" or "the office intellectual" means his speech often includes more sophisticated, multi-syllabic words.
        5. Toby: Lowest Hapax Legomena- Toby’s dialogue is subdued and repetitiveand always speaks in a predictable language.
      
      </div>
      <div className="linebarchart-container">
        <TextAnalysisHeatMap />
        <h2>Insights</h2>
        1. Phyllis Uses the most verbs- Phyllis is often portrayed as a character who is understated yet active within the office dynamics. Verbs, which denote actions or states, might reflect her tendency to narrate or engage in activities subtly. She often participates in gossip or office events, which might explain the higher usage of action words.
        2. Erin uses the most adjectives- Erin's bubbly and optimistic personality could lead her to use more descriptive language. Adjectives, which modify nouns and add emotional or vivid detail, align with how she communicates her enthusiasm or quirks.
        3. Meredith and Creed use the most nouns- Meredith is known for her straightforwardness while Creed, with his enigmatic and offbeat speech, often delivers cryptic one-liners or factual observations. His dialogue might include many nouns because of his habit of referencing people, places, or unusual objects in a direct, unadorned way.
        4. Stanley Uses the Least Adjectives- Stanley is known for his no-nonsense, practical, and often disinterested demeanor.
        5. Andy Uses the Least Verbs- Andy’s character is more about flamboyance, self-promotion, and emotion rather than action or process.
        6. Kelly uses the least nouns-  Emotionally expressive and abstract, focuses less on concrete details.
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
            <span> (in Millions)</span>
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