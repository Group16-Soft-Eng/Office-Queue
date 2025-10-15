import React, { useState, useEffect } from 'react';
import '../styles/Home.css';

const fullText = "Welcome to Office Queue Management System";

const Home: React.FC = () => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(timer);
    }, 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-container">
      <h1 className="app-title">
        <span className="main-text">{displayed}</span>
        <span className="cursor">|</span>
      </h1>
    </div>
  );
};

export default Home;