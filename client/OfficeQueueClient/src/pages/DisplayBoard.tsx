// DisplayBoard.tsx
import React, { useEffect, useState } from 'react';
import '../styles/DisplayBoard.css';

// Define what information we need for counters that are serving customers
interface ServingInfo {
  ticketNumber: string | null;  // The ticket being served, or null if available
  counterId: number;           // Which counter (1-5)
  isActive: boolean;           // Whether this counter is active today
}

// Define what information we need for waiting customers
interface WaitingInfo {
  ticketNumber: string;        // The customer's ticket number
  serviceId: number;           // Which service they're waiting for (1-5)
  estimatedTime: string;       // How long they'll wait
}

const DisplayBoard: React.FC = () => {
  // State to track what's happening right now
  const [currentlyServing, setCurrentlyServing] = useState<ServingInfo[]>([]);  // Counters and what they're doing
  const [waitingQueue, setWaitingQueue] = useState<WaitingInfo[]>([]);          // Customers waiting in line
  const [activeServices, setActiveServices] = useState<number[]>([]);           // Which counters are active today

  // Load data when component starts and refresh every 3 seconds
  useEffect(() => {
    loadDisplayData();
    const interval = setInterval(loadDisplayData, 3000);  // Update every 3 seconds
    return () => clearInterval(interval);  // Clean up when component unmounts
  }, []);

  // Calculate how long a customer will wait based on their position in line
  const calculateEstimatedTime = (serviceId: number, position: number): string => {
    // Assume each customer takes 5 minutes to serve
    const averageServiceTimeMinutes = 5;
    const totalWaitMinutes = position * averageServiceTimeMinutes;
    
    // Format the time nicely
    if (totalWaitMinutes < 60) {
      return `${totalWaitMinutes} min`;
    } else {
      const hours = Math.floor(totalWaitMinutes / 60);
      const minutes = totalWaitMinutes % 60;
      return `${hours}h ${minutes}m`;
    }
  };

  // Load all the data to display on the board
  const loadDisplayData = () => {
    const serving: ServingInfo[] = [];    // List of counters and their status
    const allWaiting: WaitingInfo[] = []; // List of all waiting customers
    
    // Load which counters are active today
    const savedServices = localStorage.getItem('selectedServices');
    const activeServicesList = savedServices ? JSON.parse(savedServices) as number[] : [];
    setActiveServices(activeServicesList);

    // Check all 5 counters to see what they're doing
    for (let counterId = 1; counterId <= 5; counterId++) {
      const currentTicket = localStorage.getItem(`current_serving_${counterId}`);
      const isActive = activeServicesList.includes(counterId);
      
      // Add this counter to our display list
      serving.push({
        ticketNumber: currentTicket,
        counterId: counterId,
        isActive: isActive
      });
    }

    // Load all customers waiting in line across all services
    for (let serviceId = 1; serviceId <= 5; serviceId++) {
      const savedQueue = localStorage.getItem(`service_${serviceId}_queue`);
      if (savedQueue) {
        const serviceQueue = JSON.parse(savedQueue) as string[];
        // For each waiting customer, calculate their wait time
        serviceQueue.forEach((ticket, index) => {
          allWaiting.push({
            ticketNumber: ticket,
            serviceId: serviceId,
            estimatedTime: calculateEstimatedTime(serviceId, index + 1)
          });
        });
      }
    }

    // Sort waiting customers by service number and show only first 6
    const nextWaiting = allWaiting
      .sort((a, b) => a.serviceId - b.serviceId)  // Sort by service 1,2,3,4,5
      .slice(0, 6);  // Show only first 6 customers

    // Update the display with new data
    setCurrentlyServing(serving);
    setWaitingQueue(nextWaiting);
  };

  return (
    <div className="display-board">
      <div className="board-header">
        <h1>📋 Post Office Display</h1>
        <p>Current service status and waiting customers</p>
      </div>

      {/* Always show all 5 counters - this section never hides */}
      <div className="currently-serving-section">
        <h2>Now Serving</h2>
        <div className="serving-grid">
          {currentlyServing.map((item) => (
            <div 
              key={item.counterId} 
              // Different CSS classes based on counter status:
              // - active/inactive: whether counter is open today
              // - serving/available: whether counter has a customer
              className={`serving-item ${item.isActive ? 'active' : 'inactive'} ${item.ticketNumber ? 'serving' : 'available'}`}
            >
              <div className="service-header">
                Counter {item.counterId}
                {/* Show "Closed" badge for inactive counters */}
                {!item.isActive && <span className="inactive-badge">Closed</span>}
              </div>
              <div className="ticket-display">
                {item.ticketNumber ? (
                  // Counter is serving a customer
                  <>
                    <span className="ticket-number">{item.ticketNumber}</span>
                    <span className="status-badge serving">Serving</span>
                  </>
                ) : (
                  // Counter is available (no customer)
                  <>
                    <span className="available-text">Available</span>
                    <span className="status-badge available">Ready</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Only show waiting customers section if there are people waiting */}
      {waitingQueue.length > 0 && (
        <div className="waiting-queue-section">
          <h2>Waiting Customers</h2>
          <div className="queue-list">
            {waitingQueue.map((item, index) => (
              <div key={item.ticketNumber} className="queue-item">
                <div className="queue-position">#{index + 1}</div>
                <div className="ticket-info">
                  <span className="ticket-number">{item.ticketNumber}</span>
                  <span className="service-badge">Service {item.serviceId}</span>
                </div>
                <div className="estimated-time">
                  ~{item.estimatedTime}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show  message when no one is waiting */}
      {waitingQueue.length === 0 && (
        <div className="no-waiting-section">
         
          <h3>No Customers Waiting</h3>
          <p>Immediate service available</p>
        </div>
      )}

      {/* Show when the display was last updated */}
      <div className="last-updated">
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default DisplayBoard;