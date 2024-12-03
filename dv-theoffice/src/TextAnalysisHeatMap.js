import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import Heatmap from './Heatmap';

const margin = { top: 50, right: 50, bottom: 50, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

const TextAnalysisHeatMap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('DataVis-TheOffice/data/character_metrics_POS.json')
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
    <div>
      <h1>Character POS Heatmap</h1>
      {data.length > 0 ? <Heatmap data={data} /> : <p>Loading...</p>}
    </div>
  );
}

export default TextAnalysisHeatMap;