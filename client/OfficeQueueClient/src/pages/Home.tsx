import React, { useState, useEffect } from 'react';

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
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // centra verticalmente
        alignItems: "center", 
    }}
    >
      <h1 className="app-title" style={{ minHeight: "3rem" }}>
        <span style={{ color: "#fff" }}>{displayed}</span>
        <span style={{
          color: "#764ba2",
          fontWeight: "bold",
          marginLeft: "2px",
          borderLeft: "2px solid #764ba2",
          paddingLeft: "2px"
        }}>|</span>
      </h1>
    </div>
  );
};

export default Home;