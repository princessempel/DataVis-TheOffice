import React, { useState } from "react";
import './App.css';
import LineXStackedBarChart from './LineXStackedBarChart';
import CharacterProfile from "./CharacterProfiles";
import NetworkDiagram from "./NetworkDiagram";
import TreeDropdown from "./TreeDropdown";
import TextAnalysis from "./TextAnalysis";
import CharacterMetrics from "./CharacterMetrics";

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
          <header>
            <h2>Major Character Arcs</h2>
          </header>
          <p>
            - <i>Michael Scott:</i> Starts as a stereotypical inept boss but evolves into a beloved leader.
            His relationship with Holly Flax (HR Representative) humanizes Michael, making him more relatable and gorunded.
            His last line, reflecting a parental sentiment, encapsulates his emotional growth. <br />
            - <i>Jim Halpert:</i> In the earlier seasons he is known for pranks on Dwight, and his unspoken feelings for Pam,
            Jim appears more laid back with light-hearted and sarcastic dialogues. His relationship with Pam transforms him into
            a more commited character, his later dialogues reflects emotional depth and maturity, particularly in his interaction with Pam and Dwight.<br />
            - <i>Pam Beesly Halpert:</i> In the earlier episodes, Pam was was hesitant, shy and reserved, as her first line,
            "Well, I don't know", conveys. She gains confidence throughout the seasons, with a major milestone in Season 3, Episode 23,
            when she does the Ash walk and conveys her feelings for Jim in front of everyone from the office. By the series finale,
            Pam has grown into a decisive and self-assured individual, as seen in her last line of the show, " I thought it was weird when you picked us to make a documentary.
            But all in all'I think an ordinary paper company like Dunder Mifflin was a great subject for a documentary.
            There's a lot of beauty in ordinary things. Isn't that kind of the point?" <br />
            - <i>Dwight Schrute:</i> In the earlier seasons he is portrayed as a rigid, ambitious, and eccentric character. But gradually
            we see his emotional side, especially in his relationship with Angela and Michael. We see Dwight's vulnerability in Season 4,
            episode 3, "Dunder Mifflin Infinity", when Angela decides to break-up with Dwight after he euthanized Sprinkles, one of Angela's
            cats, he takes this break-up very hard. Towards the end of the series, Dwight finally becames the Regional Manager of the Scranton
            branch, achieving lifelong goal while establishing great relationships with all his co-workers. <br />
            - Many other characters have also had great character evolution, explore the profiles below to learn more about their role, notable quotes,
            top episode, first and last lines in show, and their contributions to the show.

          </p>
        </div>
        <CharacterProfile
          csvFilePath={"/DataVis-TheOffice/data/combined_dataset.csv"}
          jsonFilePath={"/DataVis-TheOffice/data/character_data.json"}
        />
      </div>
      <div className="insights">
        <header>
          <h2>Insights from Profile Graphs</h2>
        </header>
        <p>
          - After Michael's departure in Season 7, Episode 22, "Goodbye, Michael", we see that Dwight becomes the dialogue leader in Seasons
          8 and 9, followed by some other characters like Andy, Oscar, and Kevin. <br />
          - Jim and Pam has more steady presence in the series with relatively consistent dialogue counts. Ocassionaly spikes in the lines numbers
          for characters like Merdith in Season 5, Episode 11, "Moroccan Christmas", Oscar in Season 5, Episode 8, "Business Trip", and Toby
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