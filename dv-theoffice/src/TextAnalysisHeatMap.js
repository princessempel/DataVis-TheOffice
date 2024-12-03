import React, { useEffect, useState } from 'react';
import Heatmap from './Heatmap';


const TextAnalysisHeatMap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/DataVis-TheOffice/data/character_metrics_POS.json')
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
    <div className='container'>
      <div className='text'>
        <h1>Character POS Heatmap</h1>
        <ul>
                <li style={{ color: "white" }}><b>Erin's</b> bubbly and optimistic personality could lead her to use more descriptive language</li>
                <li style={{ color: "white" }}><b>Phyllis's</b> use of verbs might reflect her tendency to narrate or engage in activities subtly</li>
                <li style={{ color: "white" }}><b>Stanley</b> is known for his no-nonsense, practical, and often disinterested demeanor</li>
                <li style={{ color: "white" }}><b>Meredith</b> is known for her straightforwardness while <b>Creed</b> often delivers cryptic one-liners or factual observations</li>
            </ul>
      </div>
      {data.length > 0 ? <Heatmap data={data} /> : <p>Loading...</p>}
    </div>
  );
}

export default TextAnalysisHeatMap;