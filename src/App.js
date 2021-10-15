import React, {useState, useEffect } from 'react';
import Header from './components/Header';
import Button from './components/Button';
import Card from './components/Card/index';
import ScrollTop from './components/ScrollTop';
import Loading from './components/Loading';
import ErrorMessaging from './components/ErrorMessaging';
import api from './services/api';
import { useLocalStorage } from './utils/useLocalStorage';
import logoReddit from './assets/reddit-logo.png';
import './styles/global.css';

function App() {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('hot');
  const [next, setNext] = useState('');
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", "app-light");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    async function getData() {
      try {
        const response = await api.get(`${search ? `${search}.json?after&limit=10` : ''}`);
  
        const data = await response.data;
  
        setResults(data.data.children);
        setNext(data.data.after);

        setLoading(false);
      } catch (error) {
         setLoading(false);
         setError(error.message);
      }
    };
    getData();
  }, [search]);

  async function handleShowMore() {
    setLoading(true);
    setError('');

    try {
      const response = await api.get(`${search}.json?after=${next}&limit=10`);

      const data = await response.data;

      setResults(data.data.children);
      setNext(data.data.after);

      setLoading(false);
      
    } catch (error) {
      setLoading(false);
      setError(error.message);
    };
  }
  
  return (
    <div className={darkMode === "app-dark" ? "app-dark" : "app-light"}>
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />
      <div className="container flex-column">
        <div className="container-button flex-row content-center my-lg">
          <Button 
            value="hot" 
            search={search} 
            setSearch={setSearch}
          />
          <Button 
            value="new" 
            search={search} 
            setSearch={setSearch} 
          />
          <Button 
            value="rising" 
            search={search} 
            setSearch={setSearch} 
          />
        </div>
          {results.map((result) =>
            <Card
              key={result.data.id}
              author={result.data.author}
              title={result.data.title}
              hour={result.data.created}
              image={result.data.preview ? result.data.preview?.images[0]?.source.url.replaceAll('amp;','') : logoReddit}
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
      <ErrorMessaging error={error} />
      <Loading open={loading} />
    </div>
  );
}

export default App;