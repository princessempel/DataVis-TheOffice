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
        <p>Description/Insights</p>
      </div>
      {data.length > 0 ? <Heatmap data={data} /> : <p>Loading...</p>}
    </div>
  );
}

export default TextAnalysisHeatMap;