// CounterPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Counter.css';

const CounterPage: React.FC = () => {
  // Hook for navigation between pages
  const navigate = useNavigate();
  
  // State to track which counters are active (1-5)
  const [activeServices, setActiveServices] = useState<number[]>([]);

  // Load active services when component first loads
  useEffect(() => {
    // Get the list of active services from browser storage
    const saved = localStorage.getItem('selectedServices');
    if (saved) {
      // Convert from string to array and update state
      setActiveServices(JSON.parse(saved));
    }
  }, []); // Empty array means this runs only once when page loads

  // Function to handle when a counter is clicked
  const handleCounterSelect = (counterNumber: number) => {
    // Navigate to the service page for the selected counter
    navigate(`/service/${counterNumber}`);
  };

  return (
    <div className="counter-page-container">
      <div className="counter-box">
        <h2>Choose a Counter</h2>
        <p>Select your counter station:</p>
        
        {/* Container for all counter buttons */}
        <div className="counter-buttons">
          {/* Create buttons for counters 1 through 5 */}
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num} // Unique key for React
              // Apply different styles based on whether counter is active
              className={`counter-btn ${activeServices.includes(num) ? 'active' : 'inactive'}`}
              // When clicked, go to the service page
              onClick={() => handleCounterSelect(num)}
              // Disable button if counter is not active
              disabled={!activeServices.includes(num)}
            >
              Counter {num}
              {/* Show "(Inactive)" text for inactive counters */}
              {!activeServices.includes(num) && " (Inactive)"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounterPage;