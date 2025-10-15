// ManagerPage.tsx
import React, { useState, useEffect } from 'react';
import '../styles/Manager.css';
import { logoutCounter, registerCounter } from '../api/counterApi';

const ManagerPage: React.FC = () => {
  // State to track which services are selected and their statistics
  const [selectedServices, setSelectedServices] = useState<number[]>([]);  // List of active service IDs (1-5)
  const [statistics, setStatistics] = useState<{[key: number]: {queueLength: number, servedToday: number}}>({}); // Stats for each service
  const [isLoaded, setIsLoaded] = useState(false);  // Track if data has finished loading

  
  // Load saved services when the page first loads
  useEffect(() => {
    const loadSavedServices = () => {
      try {
        // Get the saved services from browser storage
        const saved = localStorage.getItem('selectedServices');
        console.log('🔍 Loading from localStorage:', saved);
        
        if (saved && saved !== 'undefined' && saved !== 'null') {
          const parsed = JSON.parse(saved);
          console.log('📋 Parsed services:', parsed);
          
          // Make sure we have a valid array of numbers
          if (Array.isArray(parsed) && parsed.every(item => typeof item === 'number')) {
            setSelectedServices(parsed);
          } else {
            // If data is corrupted, reset to empty
            console.warn('⚠️ Invalid data format, resetting to empty array');
            setSelectedServices([]);
            localStorage.setItem('selectedServices', JSON.stringify([]));
          }
        } else {
          // If no saved data, start fresh
          console.log('❌ No valid saved services found, starting fresh');
          setSelectedServices([]);
        }
      } catch (error) {
        // Handle any errors during loading
        console.error('💥 Error loading services:', error);
        setSelectedServices([]);
      } finally {
        // Mark loading as complete
        setIsLoaded(true);
      }
    };

    loadSavedServices();
    loadStatistics();
  }, []);

  // Save services to storage whenever the selection changes
  useEffect(() => {
    if (isLoaded) {
      console.log('💾 Saving to localStorage:', selectedServices);
      try {
        localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
      } catch (error) {
        console.error('💥 Error saving services:', error);
      }
      loadStatistics();
    }
  }, [selectedServices, isLoaded]);

  // Toggle a service on/off
  const toggleService = (serviceId: number) => {
    console.log('🔄 Toggling service:', serviceId);
    if (selectedServices.includes(serviceId)) {
      // If toggling off, call logoutCounter
      logoutCounter(serviceId).then(() => {
        setSelectedServices(prev => prev.filter(id => id !== serviceId));
      });
    } else {
      // If toggling on, call registerCounter
      registerCounter(serviceId, [`s${serviceId}`]).then((data) => {
      console.log('✅ Counter registered:', data);
      setSelectedServices(prev => [...prev, serviceId]);
      });
    }
  };

  // Load statistics for all services
  const loadStatistics = () => {
    const stats: {[key: number]: {queueLength: number, servedToday: number}} = {};
    // Check all 5 services
    for (let i = 1; i <= 5; i++) {
      const queue = localStorage.getItem(`service_${i}_queue`);
      const served = localStorage.getItem(`service_${i}_served`) || '0';
      stats[i] = {
        queueLength: queue ? JSON.parse(queue).length : 0,  // How many waiting
        servedToday: parseInt(served)                      // How many served today
      };
    }
    setStatistics(stats);
  };

  // Reset everything - clear all data for a new day
  const resetDay = () => {
    if (window.confirm('Are you sure you want to reset all queues and statistics?')) {
      // Clear all data for services 1-5
      for (let i = 1; i <= 5; i++) {
        localStorage.removeItem(`service_${i}_queue`);      // Clear waiting queues
        localStorage.removeItem(`service_${i}_served`);     // Clear served counts
        localStorage.removeItem(`service_${i}_ticketCount`); // Clear ticket counters
        localStorage.removeItem(`current_serving_${i}`);    // Clear currently serving customers
      }
      // Clear the active services selection
      localStorage.removeItem('selectedServices');
      setSelectedServices([]);
      setStatistics({});
      alert('All queues, statistics, and current services have been reset!');
    }
  };

  // Show loading screen while data is being loaded
  if (!isLoaded) {
    return (
      <div className="manager-page">
        <h1>Manager Dashboard</h1>
        <div className="loading-state">
          <p>Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="manager-page">
      <h1>Manager Dashboard</h1>
      
      {/* Section for selecting which services are active today */}
      <div className="services-selection">
        <h2>Active Services Selection</h2>
        <p>Select which services should be active today:</p>
        <div className="services-grid">
          {[1, 2, 3, 4, 5].map(serviceId => (
            <div key={serviceId} className="service-checkbox">
              <label className={`checkbox-label ${selectedServices.includes(serviceId) ? 'active' : 'inactive'}`}>
                <input
                  type="checkbox"
                  checked={selectedServices.includes(serviceId)}
                  onChange={() => toggleService(serviceId)}
                />
                <span className="checkmark"></span>
                Service {serviceId}
                {/* Show checkmark or X for visual feedback */}
                <small style={{marginLeft: '8px', color: '#666'}}>
                  {selectedServices.includes(serviceId) ? '✅' : '❌'}
                </small>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Section showing current statistics for all services */}
      <div className="statistics-section">
        <h2>Today's Statistics</h2>
        <div className="stats-grid">
          {[1, 2, 3, 4, 5].map(serviceId => (
            <div key={serviceId} className={`stat-card ${selectedServices.includes(serviceId) ? 'active' : 'inactive'}`}>
              <h3>Service {serviceId}</h3>
              <div className="stat-details">
                <p><strong>Queue Length:</strong> {statistics[serviceId]?.queueLength || 0}</p>
                <p><strong>Served Today:</strong> {statistics[serviceId]?.servedToday || 0}</p>
                <p><strong>Status:</strong> 
                  <span className={`status ${selectedServices.includes(serviceId) ? 'active' : 'inactive'}`}>
                    {selectedServices.includes(serviceId) ? '🟢 Active' : '🔴 Inactive'}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons for the manager */}
      <div className="manager-actions">
        <button onClick={loadStatistics} className="refresh-btn">
          Refresh Statistics
        </button>
        <button onClick={resetDay} className="reset-btn">
          Reset All Data
        </button>
      </div>
    </div>
  );
};

export default ManagerPage;