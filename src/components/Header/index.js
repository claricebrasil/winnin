import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function Header({ darkMode, setDarkMode }) {

  function handleDarkMode(e) {
    e.preventDefault();
    setDarkMode(darkMode === "app-light" ? "app-dark" : "app-light");
  }

  return (
    <header className="header-top">
        <h1>React
          <span>JS</span>
        </h1>
        <div 
          onClick={handleDarkMode} 
          className={darkMode === "app-light" ? "light-mode" : "dark-mode"}
        >
          {darkMode === "app-light" ? <FiSun /> : <FiMoon />}
        </div>
      </header>
  );
}