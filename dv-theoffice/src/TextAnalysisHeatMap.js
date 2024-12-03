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
      <div className='text-analysis-insight '>
        <h1>Parts of Speech: Dunder Mifflin Edition</h1>
        <p>Here's an analysis of the parts of speech of each character's dialogues. It's a great tool that shows all kinds of insights about each character and their personality. Here's some insights we found:</p><br></br>
        <b>Erin's</b> bubbly and optimistic personality could lead her to use more descriptive language.<br></br>
         <b>Phyllis's</b> use of verbs might reflect her tendency to narrate or engage in activities subtly.<br></br>
         <b>Stanley</b> is known for his no-nonsense, practical, and often disinterested demeanor and doesn't use much adjectives.<br></br>
        <b>Meredith</b> is known for her straightforwardness while <b>Creed</b> often delivers cryptic one-liners or factual observations, which explains their excessive use of nouns.
      </div>
      {data.length > 0 ? <Heatmap data={data} /> : <p>Loading...</p>}
    </div>
  );
}

export default TextAnalysisHeatMap;