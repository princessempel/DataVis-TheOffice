const CharacterMetrics = () => {
    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        fetch('/character_metrics.json')
            .then((response) => response.json())
            .then((data) => setMetrics(data));
    }, []);

    return (
        <div>
            {metrics
                ? Object.entries(metrics).map(([character, stats]) => (
                      <div key={character}>
                          <h3>{character}</h3>
                          <ul>
                              {Object.entries(stats).map(([key, value]) => (
                                  <li key={key}>
                                      {key}: {value.toFixed(2)}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  ))
                : 'Loading...'}
        </div>
    );
};

export default CharacterMetrics;