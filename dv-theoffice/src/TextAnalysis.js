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
        <p>Description blurb?</p>
      </div>
      {data.length > 0 ? <ParallelCoordinates data={data} /> : <p>Loading...</p>}
    </div>
  );
};

export default TextAnalysis;