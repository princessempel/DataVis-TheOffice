import React, { useState, useEffect } from 'react';
import ParallelCoordinates from './ParallelCoordinates';

const TextAnalysis = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/DataVis-TheOffice/data/character_metrics.json')
      .then(response => response.json())
      .then(data => {
        const formattedData = Object.keys(data).map(character => ({
          Character: character,
          ...data[character],
        }));
        setData(formattedData);
      });
  }, []);

  return (
    <div className="container">
      <div className="text-analysis-insight">
        <h1 style={{ flex: 1 }}>Lines of Dialog: A Parallel Breakdown</h1>
        <p >Here's a visual representation that reveals unique patterns in the characters’ speech styles.
          Explore it to identify correlations, compare speech traits across characters, and uncover insights that align with their personalities and roles in the show.
          <i> Hapax Legomenon is a word or an expression that occurs only once within a context.</i></p><br></br>
        <b>Kelly</b> likes to gossip and often has emotional outbursts, which don’t require a sophisticated vocabulary. Her sentences are usually long because she tends to ramble without thinking ahead.<br></br>
        <b>Meredith's</b> dialogue is often short, to the point, and laced with humor or shock value, rather than linguistic complexity.<br></br>
        <b>Dwight's</b> vocabulary often includes longer, more formal words because of his unique speech patterns.<br></br>
        <b>Oscar's</b> role as "the office intellectual" means his speech often includes more sophisticated.<br></br>
        <b>Toby's</b> dialogue is subdued and repetitive and always speaks in a predictable language.
      </div>
      {data.length > 0 ? <ParallelCoordinates data={data} /> : <p>Loading...</p>}
    </div>
  );
};

export default TextAnalysis;