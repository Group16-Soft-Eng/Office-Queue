// ServicePage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ServicePage.css';
import { completeTicket } from '../api/ticketApi';
import { getNextCustomer } from '../api/counterApi';

const ServicePage: React.FC = () => {
  // Get the counter/service ID from the URL (like /service/1, /service/2, etc.)
  const { id } = useParams<{ id: string }>();
  const serviceId = Number(id);

  // State to manage this counter
  const [active, setActive] = useState(false);          // Whether this counter is active today
  const [queue, setQueue] = useState<string[]>([]);     // List of customers waiting
  const [currentTicket, setCurrentTicket] = useState<string | null>(null); // Ticket currently being served

  // Check if this service is active (manager has turned it on)
  useEffect(() => {
    const selected = localStorage.getItem('selectedServices');
    if (selected) {
      const activeServices = JSON.parse(selected) as number[];
      setActive(activeServices.includes(serviceId));
    }
  }, [serviceId]);

  // Load the waiting queue and current ticket when page loads
  useEffect(() => {
    loadQueue();
    loadCurrentTicket();

    // Listen for when manager resets data (clears everything)
    const handleStorageChange = () => {
      loadQueue();
      loadCurrentTicket();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [serviceId]);

  // Load the list of customers waiting in line
  const loadQueue = () => {
    const savedQueue = localStorage.getItem(`service_${serviceId}_queue`);
    if (savedQueue) {
      setQueue(JSON.parse(savedQueue));
    } else {
      setQueue([]); // No queue found, start with empty list
    }
  };

  // Load the ticket that's currently being served (if any)
  const loadCurrentTicket = () => {
    const savedCurrentTicket = localStorage.getItem(`current_serving_${serviceId}`);
    if (savedCurrentTicket) {
      setCurrentTicket(savedCurrentTicket);
    } else {
      setCurrentTicket(null); // No ticket being served
    }
  };

  // Call the next customer from the queue
  const serveNextClient = () => {

    getNextCustomer(serviceId).then((ticket) => {
      if (ticket) {
        console.log('Next ticket to serve:', ticket);
        setCurrentTicket(ticket.id_ticket);
      }
    });
  };

  // Mark the current customer as finished
  const completeCurrentTicket = () => {
    // Increase the "served today" counter

    completeTicket(currentTicket!).then(() => {
      // Clear the current ticket and update storage
      setCurrentTicket(null);
    });
  };

  // Show inactive message if this counter is turned off
  if (!active) {
    return (
      <div className="service-page">
        <h1>Counter {serviceId}</h1>
        <p className="inactive-msg">🚫 This counter is not active today.</p>
      </div>
    );
  }

  return (
    <div className="service-page">
      <h1>Counter {serviceId}</h1>

      {/* Show what's happening right now */}
      <div className="current-ticket-section">
        <h3>Currently Serving:</h3>
        {currentTicket ? (
          // Show the ticket being served and complete button
          <div className="current-ticket-display">
            <div className="ticket-number-large">{currentTicket}</div>

            {/* Complete service button 
            <button onClick={completeCurrentTicket} className="complete-btn">
              ✅ Complete Service
            </button>
            */}
          </div>
        ) : (
          // Show "available" message and next customer button
          <div className="no-ticket">
            <p>No ticket being served</p>
          </div>
        )}
        <div className="current-ticket-display">
          <button
            onClick={serveNextClient}
            /*disabled={queue.length === 0} */
            className="serve-next-btn"
          >
            Call Next Customer
          </button>
        </div>
      </div>

      {/* Show how many people are waiting 
      <div className="queue-info">
        <h3>Waiting Queue: {queue.length} customers</h3>
        <button onClick={loadQueue} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      {/* Show the list of waiting customers }
      <div className="queue-section">
        <ul className="queue-list">
          {queue.map((ticket, index) => (
            <li key={index} className={index === 0 ? 'next-in-line' : ''}>
              <span className="ticket-number">{ticket}</span>
              {index === 0 && <span className="next-badge">(Next)</span>}
            </li>
          ))}
          {queue.length === 0 && (
            <li className="empty-queue">No customers waiting</li>
          )}
        </ul>
      </div>
    */}
    </div>
  );
};

export default ServicePage;