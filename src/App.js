import React, {useState, useEffect } from 'react';
import Card from './components/Card/index';
import ScrollTop from './components/Card/ScrollTop';
import api from './services/api';
import './styles/global.css';
import { FiSun, FiMoon } from 'react-icons/fi';

function App() {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('hot');
  const [next, setNext] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  async function getData() {
    try {
      const response = await api.get(`${search ? `${search}.json?after&limit=10` : ''}`);

      const data = await response.data;

      setResults(data.data.children);
      setNext(data.data.after)
    } catch (error) {
       return(error);
    }
  }

  useEffect(() => {
    getData();
  }, [search]);

  async function handleShowMore() {
    try {
      const response = await api.get(`${search}.json?after=${next}&limit=10`);

      const data = await response.data;

      setResults(data.data.children);
      setNext(data.data.after);
    } catch (error) {
       return(error);
    };
  }

  function handleDarkMode(e) {
    e.preventDefault();
    setDarkMode(!darkMode);
  }
  
  return (
    <div className={darkMode ? "app-dark" : "App"}>
      <header>
        <h1>React
          <span>JS</span>
        </h1>
        <div 
          onClick={handleDarkMode} 
          className={darkMode ? "light-mode" : "dark-mode"}
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </div>
      </header>
      <div className="container flex-column">
        <div className="container-button flex-row content-center my-lg">
          <button
            className={search === "hot" ? "btn-filter-active" : "btn-filter" }
            value="hot" 
            onClick={(e) => setSearch(e.target.value)}
          >
            Hot
          </button>
          <button
            className={search === "new" ? "btn-filter-active" : "btn-filter"} 
            value="new" 
            onClick={(e) => setSearch(e.target.value)}
          >
            News
          </button>
          <button
            className={search === "rising" ? "btn-filter-active" : "btn-filter"}  
            value="rising" 
            onClick={(e) => setSearch(e.target.value)}
          >
            Rising
          </button>
        </div>
          {results.map((result) =>
            <Card
              key={result.data.id}
              author={result.data.author}
              title={result.data.title}
              hour={result.data.created}
              image={result.data.url}
              domain={result.data.domain}
            />
          )}
        <ScrollTop />
        <button 
          className="end-button justify-end mb-lg" 
          onClick={handleShowMore}
        >
          + Ver mais
        </button>
      </div>
    </div>
  );
}

export default App;
