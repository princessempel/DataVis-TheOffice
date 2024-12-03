import React from "react";
import "./ProfileInsights.css"; // Add a separate CSS file for styling the timeline.
import CharacterProfile from "./CharacterProfiles";
import dwightLines from './InsightsImages/dwightLines.png';
import andyLines from './InsightsImages/andyLines.png';
import jimScenes from './InsightsImages/jimScenes.png';
import meredithLines from './InsightsImages/meredithLines.png';
import creedScenes from './InsightsImages/creedScenes.png';
import oscarLines from './InsightsImages/oscarLines.png';
import michaelScenes from './InsightsImages/michaelScene.png';
import dwightScenes1 from './InsightsImages/dwightScenes1.png';
import andyScenes from './InsightsImages/andyScenes.png';
import stanleyScenes from './InsightsImages/stanleyScenes.png';
import dwightScenes2 from './InsightsImages/dwightScenes2.png';


const ProfileInsights = () => {
    return (
        <div>
            <section className="profile-insights">

                <div className="timeline-section">
                    <header>
                        <h1>Major Character Arcs</h1>
                    </header>
                    <div className="timeline">
                        <div className="timeline-item">
                            <div className="timeline-content">
                                <h3>Michael Scott</h3>
                                <p>
                                    Starts as a stereotypical inept boss but evolves into a beloved
                                    leader. His relationship with Holly Flax (HR Representative)
                                    humanizes Michael, making him more relatable and grounded. His
                                    last line, reflecting a parental sentiment, encapsulates his
                                    emotional growth.
                                </p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-content">
                                <h3>Jim Halpert</h3>
                                <p>
                                    In the earlier seasons, he is known for pranks on Dwight and his
                                    unspoken feelings for Pam. Jim appears more laid-back with
                                    light-hearted and sarcastic dialogues. His relationship with
                                    Pam transforms him into a more committed character, and his
                                    later dialogues reflect emotional depth and maturity,
                                    particularly in his interaction with Pam and Dwight.
                                </p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-content">
                                <h3>Pam Beesly Halpert</h3>
                                <p>
                                    In the earlier episodes, Pam was hesitant, shy, and reserved,
                                    as her first line, "Well, I don't know," conveys. She gains
                                    confidence throughout the seasons, with a major milestone in
                                    Season 3, Episode 23, when she does the Ash walk and conveys
                                    her feelings for Jim in front of everyone from the office. By
                                    the series finale, Pam has grown into a decisive and
                                    self-assured individual, as seen in her last line of the show,
                                    "I thought it was weird when you picked us to make a
                                    documentary. But all in all, I think an ordinary paper company
                                    like Dunder Mifflin was a great subject for a documentary.
                                    There's a lot of beauty in ordinary things. Isn't that kind of
                                    the point?"
                                </p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-content">
                                <h3>Dwight Schrute</h3>
                                <p>
                                    In the earlier seasons, he is portrayed as a rigid, ambitious,
                                    and eccentric character. But gradually, we see his emotional
                                    side, especially in his relationships with Angela and Michael.
                                    We see Dwight's vulnerability in Season 4, Episode 3, "Dunder
                                    Mifflin Infinity," when Angela decides to break up with Dwight
                                    after he euthanized Sprinkles, one of Angela's cats. He takes
                                    this breakup very hard. Towards the end of the series, Dwight
                                    finally becomes the Regional Manager of the Scranton branch,
                                    achieving his lifelong goal while establishing great
                                    relationships with all his co-workers.
                                </p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-content">
                                <h3>Other Characters</h3>
                                <p>
                                    Many other characters have also had great character evolution.
                                    Explore the profiles below to learn more about their roles,
                                    notable quotes, top episodes, first and last lines in the series,
                                    and their contributions to the show.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="character-profile">
                <header className="section-header">
                    <h1>
                        <i>The Office</i> Character Profiles
                    </h1>
                    <h4>The donut chart shows sentiment analysis for each character, hover over different colors to see the values.
                        Click on the characters' images to see their profile information.
                    </h4>
                </header>
                <CharacterProfile
                    csvFilePath={"/DataVis-TheOffice/data/combined_dataset.csv"}
                    jsonFilePath={"/DataVis-TheOffice/data/character_data.json"}
                />
            </section>
            <section className="profile-insights">
                <div className="insights-stacked-section">
                    <header>
                        <h2 style={{ paddingLeft: "40px" }}>Insights from Profile Graphs</h2>
                    </header>

                    {/* Insight 1 */}
                    <div className="insight-item">
                        <h3>After Michael's Departure</h3>
                        <p>
                            After Michael's departure in Season 7, Episode 22, "Goodbye,
                            Michael", we see that Dwight becomes the dialogue leader in
                            Seasons 8 and 9, followed by some other characters like Andy,
                            Oscar, and Kevin.
                        </p>
                        <div className="graph-grid">
                            <img src={dwightLines} alt="Graph 1" />
                            <img src={andyLines} alt="Graph 2" />
                        </div>
                    </div>

                    {/* Insight 2 */}
                    <div className="insight-item">
                        <h3>Jim and Pam's steady presence, while other's with some character focused episodes </h3>
                        <p>
                            Jim and Pam have more steady presence in the series with
                            relatively consistent dialogue and scene counts. Occasionally,
                            spikes in the line and scene numbers for characters like Meredith
                            in Season 5, Episode 11, "Moroccan Christmas", Oscar in Season 5,
                            Episode 8, "Business Trip", and Creed in Season 3, Episode 21,
                            "Product Recall" correlate with plotlines that focus more on those
                            characters.
                        </p>
                        <div className="graph-grid">
                            <img src={jimScenes} alt="Graph 1" />
                            <img src={meredithLines} alt="Graph 2" />
                            <img src={creedScenes} alt="Graph 3" />
                            <img src={oscarLines} alt="Graph 4" />
                        </div>
                    </div>

                    {/* Insight 3 */}
                    <div className="insight-item">
                        <h3>Fan Dislikes for Certain Episodes</h3>
                        <p>
                            Despite everyone's contribution to Season 6, Episode 14, "The
                            Banker", that episode has one of the worst ratings as fans see it
                            as a "lazy" episode due to majority of the episode replaying clips
                            from previous ones. Similarly, Season 8, Episode 19, "Get the
                            Girl" has a scaled rating of 0, which might indicate Nellie or Andy are not
                            a likable characters.
                        </p>
                        <div className="graph-grid">
                            <img src={michaelScenes} alt="Graph 1" />
                            <img src={dwightScenes1} alt="Graph 2" />
                            <img src={andyScenes} alt="Graph 3" />
                        </div>
                    </div>

                    {/* Insight 4 */}
                    <div className="insight-item">
                        <h3>Best Episodes: Stress Relief and Goodbye Michael</h3>
                        <p>
                            Two of the best episodes in the series, Season 5, Episode 14,
                            "Stress Relief", and Season 7, Episode 22, "Goodbye Michael", have
                            contributions from almost all characters. Stanley's lines in
                            "Stress Relief" showcase his comedic contributions, while Dwight's
                            lines in "Goodbye Michael" highlight his relationship with
                            Michael.
                        </p>
                        <div className="graph-grid">
                            <img src={stanleyScenes} alt="Graph 1" />
                            <img src={dwightScenes2} alt="Graph 2" />

                        </div>
                    </div>

                </div>

            </section>

        </div>
    );
};

export default ProfileInsights;
