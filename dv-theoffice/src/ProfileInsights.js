import React from "react";
import "./ProfileInsights.css"; // Add a separate CSS file for styling the timeline.

const ProfileInsights = () => {
    return (
        <section className="profile-insights">

            <div className="timeline-section">
                <header>
                    <h2>Major Character Arcs</h2>
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
                                notable quotes, top episodes, and their contributions to the
                                show.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileInsights;
