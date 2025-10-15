import React, { useEffect, useState } from 'react';
import '../styles/Statistics.css';

const Statistics: React.FC = () => {
  // State to track which services are active (1-5)
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  // Load the active services when the page loads
  useEffect(() => {
    const saved = localStorage.getItem('selectedServices');
    if (saved) {
      setSelectedServices(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="stats-container">
      <h1>Service Statistics</h1>

      <div className="stats-grid">
        {/* Show message if no services are active */}
        {selectedServices.length === 0 && (
          <p>No services selected. Go to Manager page to choose services.</p>
        )}

        {/* Show statistics cards for each active service */}
        {[...selectedServices].sort((a, b) => a - b).map((service) => (
          <div key={service} className="stats-card">
            <h2>Service {service}</h2>
            <div className="stats-details">
              {/* Placeholder for daily statistics */}
              <p>Customers today: <strong>-</strong></p>
              {/* Placeholder for weekly statistics */}
              <p>Customers this week: <strong>-</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;