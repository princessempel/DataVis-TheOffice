import React, { useState } from "react";
import './App.css';
import LineXStackedBarChart from './LineXStackedBarChart';
import NetworkDiagram from "./NetworkDiagram";
import TreeDropdown from "./TreeDropdown";
import ProfileInsights from "./ProfileInsights";
import TextAnalysis from "./TextAnalysis";
import TextAnalysisHeatMap from "./TextAnalysisHeatMap";
import CharacterDropdown from "./CharacterDropdown";
import CharacterNetworkDiagram from "./CharacterNetworkDiagram";
import introImage from './assets/hero-image.jpeg';
import pamMichael from './InsightsImages/pamMichael.png';
import stressRelief from './InsightsImages/DwightSchruteFaceMask.png';
import declinedRatings from './InsightsImages/declinedRatings.png';

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
          <h2>Return to <i>The Office</i> (RTO)</h2>
          <p>(CS 6730) Data Visualization Project</p>
          <p>Group 17: Sanjana Date, Princess Empel, Aditi Patel, Arya Tadepalli</p>
        </div>
      </div>
      <br /><br />
      <div class="container">
        <div class="text">
          <p>The TV show The Office has gained widespread popularity, and many characters from the show have become cultural icons.
            The show which aired from 2005 to 2013 still holds an important place in pop culture history.
            Considering this, there hasn’t been an extensive quantitative analysis that explores the correlation between a
            character's on-screen presence and their contribution to the show's success.
            Understanding this dynamic could provide insights into how character development, memorable lines, and screen time
            contribute to the overall popularity of the show and drive viewership trends. Additionally, it could reveal patterns
            in a character's growing or shrinking importance within the series. This project will operate
            at the intersection of entertainment analytics and cultural data visualization.
          </p>
        </div>
        <div class="image">
          <img src={introImage} alt="The Office" />
        </div>
      </div>
      <div className="container">
      <p>'The Office' isn't just a sitcom; it's a cultural phenomenon that perfectly balances humor, heartfelt moments, and an unforgettable cast of characters. It’s a show that has remained relevant years after it first aired, capturing the intricacies of everyday office life while delivering a unique brand of comedy that appeals to viewers of all ages.
Whether you’re here as a long-time fan or a newcomer, there’s something for everyone to enjoy.</p>
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
          <br /><br />
        </div>


        {/* <span style={{ alignSelf: "center", justifySelf: "center", color: "white", fontWeight: "bold" }}>per Episode in Each Season</span> */}
        <LineXStackedBarChart
          csvFilePath={"/DataVis-TheOffice/data/the_office_episodes_processed.csv"}
          dataKey={dataKey}
          yAxisLabel={getYAxisLabel()}
        />
      </div>
      <h2 style={{ paddingLeft: "40px" }}>Chart Insights</h2>
      <div className="container" style={{ paddingTop: "0px", paddingBottom: "0px" }}>
        <div className="insight-item" >
          <h3>Why is there a peak in the viewship graph?</h3>
          <h4>Stress Relief (Season 5, Episode 77)</h4>
          <p>
            Has the highest viewership with 22.91 million and is generally one of the highly rated episodes of the entire show.
            A standout due to its humor, emotional beats, and memorable cold open (the fire drill).  The episode is considered a favorite by many fans of the series.
            Many commentators particularly praised the chaotic cold open scene, in which Dwight panics his co-workers with a simulated fire as part of a twisted safety demonstration.
            It allows us to see key qualities of each character. This episode significantly spiked in viewership and ratings, demonstrating the show's ability to balance comedy with heartfelt moments.
            IMDb reports this as “genuinely one of the greatest episodes of the entire series with undoubtedly the best cold open in the history of television.”
          </p>
          <img src={stressRelief} style={{ display: "block", margin: "0 auto" }} alt="Stress Relief Episode"></img>
        </div>
        <div className="insight-item" >
          <h3>Why did the viewership decline towards the end?</h3>
          <h4>Goodbye, Michael (Season 7, Episode 137)</h4>
          <p>
            Aside from the series finale, this episode has the highest ratings with a 9.8. For many fans, his farewell was not just the end of his character’s journey but also the end of the show’s original essence. It marked a significant turning point for <i>The Office</i> as Michael was the heart of the show, bringing a unique mix of humor, awkwardness, and heartfelt moments. His exit left a void that no subsequent character or storyline fully filled, fundamentally changing the dynamic of the series.
          </p>
          <img src={declinedRatings} alt="Declined Ratings" style={{ display: "block", margin: "0 auto", marginTop: "45px", marginBottom: "45px", height: "350px", width: "600px" }}></img>
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
          <div style={{ flex: 1.25 }}>
            <TreeDropdown onSelect={setFilter} />
            <NetworkDiagram filter={filter} />
          </div>
        )}
        {viewOption === "characters" && (
          <div style={{ flex: 1.25, }}>
            <CharacterDropdown onSelect={setSelectedCharacter} />
            {selectedCharacter ? (
              <CharacterNetworkDiagram selectedCharacter={selectedCharacter} />
            ) : (
              <p>Please select a character to view their interactions.</p>
            )}
          </div>
        )}
      </div>
      <h2 style={{ paddingLeft: "40px" }}>Network Insights</h2>
      <div className="container" style={{ paddingTop: "0px", paddingBottom: "0px" }}>
        <div className="insight-item" style={{ height: "150px" }}>
          <h3>Michael Scott</h3>
          <p>
            Michael’s high interaction mentions with characters like Pam, Jim, and Dwight reflect his narrative dominance. His connections to minor characters, like Todd Packer, while fewer, often introduce chaos or comedy, showing his role as a disruptor.
          </p>
        </div>
        <div className="insight-item" style={{ height: "150px" }}>
          <h3>Dwight Schrute</h3>
          <p>
            Initial seasons highlight interactions mostly with Michael and Jim. His thickest edge with Michael indicates Michael’s complex mentorship of Dwight, oscillating between ridicule and affection. However, later seasons show growing mentions with Angela and Andy, reflecting his expanded leadership and personal storylines.
          </p>
        </div>
      </div>
      <div className="insight-item adjust-margin">
        <h3>Michael and Pam</h3>
        <div className="content-container " >
          <img
            src={pamMichael}
            alt="network"
            style={{ height: "400px", width: "400px", borderRadius: "5px" }}
          />
          <div className="text-content">
            <p>
              Michael Scott and Pam Beesly share one of the most nuanced and
              underappreciated relationships in <i>The Office</i>, which is reflected
              in the network. It evolves significantly over the series, offering
              moments of unexpected emotional depth and mutual respect. Early
              interactions reveal Michael’s immaturity and inability to recognize Pam
              as more than just “the receptionist.” Pam, in turn, shows patience,
              hinting at the seeds of their later bond. As Michael matures, Pam
              becomes a surprising source of emotional support. Their relationship
              evolves into one of quiet mutual respect. In some episodes, we see
              different ways they support each other: In "Business School" (Season 3,
              Episode 17), Michael shows up for Pam’s art exhibit after others
              dismiss it. His heartfelt support during a vulnerable moment cements
              their bond, with Michael’s line, “You did this?! How much?... for the
              painting” reflecting genuine pride. In "Local Ad" (Season 4, Episode
              9), Pam helps Michael realize his creative vision for a commercial,
              affirming her growing understanding of his need for validation.
            </p>
          </div>
        </div>
      </div>
      <br /><br />
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

    </div >
  );
}

export default App;