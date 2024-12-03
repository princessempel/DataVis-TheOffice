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
      <div className="text">
        <h1 style={{flex: 1}}>Character Metrics Parallel Coordinates</h1>
            <ul>
                <li style={{ color: "white" }}><b>Kelly</b> likes to gossip and often has emotional outbursts, which don’t require a sophisticated vocabulary. Her sentences are usually long because she tends to ramble without thinking ahead</li>
                <li style={{ color: "white" }}><b>Meredith's</b> dialogue is often short, to the point, and laced with humor or shock value, rather than linguistic complexity.</li>
                <li style={{ color: "white" }}><b>Dwight's</b> vocabulary often includes longer, more formal words because of his unique speech patterns.</li>
                <li style={{ color: "white" }}><b>Oscar's</b> role as "the office intellectual" means his speech often includes more sophisticated</li>
                <li style={{ color: "white" }}><b>Toby's</b> dialogue is subdued and repetitive and always speaks in a predictable language.</li>
            </ul>
      </div>
      {data.length > 0 ? <ParallelCoordinates data={data} /> : <p>Loading...</p>}
    </div>
  );
};

export default TextAnalysis;