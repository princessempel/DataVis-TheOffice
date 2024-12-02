import React, { useState } from "react";
import './App.css';
import LineXStackedBarChart from './LineXStackedBarChart';
import CharacterProfile from "./CharacterProfiles";
import NetworkDiagram from "./NetworkDiagram";
import TreeDropdown from "./TreeDropdown";
import TextAnalysis from "./TextAnalysis";
import CharacterMetrics from "./CharacterMetrics";
import ProfileInsights from "./ProfileInsights";

function App() {
  const [dataKey, setDataKey] = useState("ratings");
  const [filter, setFilter] = useState("all");

  // console.log(filter);

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
      <div>
        <TextAnalysis />
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
      <div className="network-diagram">
        <h1>Network Diagram</h1>
        <p>based on how many times the characters mention each others' character names/aliases (total between them)</p>
        <TreeDropdown onSelect={setFilter} />
        <NetworkDiagram filter={filter} />
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
      <div className="insights">
        <header>
          <h2>Insights from Profile Graphs</h2>
        </header>
        <p>
          - After Michael's departure in Season 7, Episode 22, "Goodbye, Michael", we see that Dwight becomes the dialogue leader in Seasons
          8 and 9, followed by some other characters like Andy, Oscar, and Kevin. <br />
          - Jim and Pam has more steady presence in the series with relatively consistent dialogue and scene counts. Ocassionaly spikes in the lines numbers
           and scene numbers for characters like Merdith in Season 5, Episode 11, "Moroccan Christmas", Oscar in Season 5, Episode 8, "Business Trip", and Toby
          in Season 4, Episode 18/19, "Goodbye Toby" correlates with plotlines that focuses more on those characters. <br />
          - Despite of everyone's contribution to Season 6, Episode 14, "The Banker" that episode has one of the worst ratings, as the fans sees it
          as a "lazy" episode because majority of the episodes replays clips from other previous episode. And then Season 8, Episode 19, "Get the Girl" has a scaled rating of 0,
          this is when Andy drives to Florida, to win Erin back while Nellie arrives at the Scranton Branch and siezes Andy's manager position, this could suggest that
          Nillie is not a likeable character. <br />
          - Two of the best episodes in the entire series Season 5, Episode 14, "Stress Relief" and Season 7, Episode 22, "Goodbye Michael" has contributions
          from almost all the characters with Stanley having the highest lines in "Stress Relief" shows shows his meaningful and comedic contribution despite having less screentime overall.
          Dwight having the highest lines in "Goodbye Michael" shows the depth of the relationship Michael and Dwight had along with how much the audience loved that duo. <br />
        </p>
      </div>

    </div>
  );
}

export default App;