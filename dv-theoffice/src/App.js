import './App.css';
import LineXStackedBarChart from './LineXStackedBarChart';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          (CS 6730) Data Vis Project: Return to <i>The Office</i>
        </p>
      </header>
      <LineXStackedBarChart csvFilePath={"data/the_office_episodes_processed.csv"} dataKey={"scaled_ratings"}/>
    </div>
  );
}

export default App;
