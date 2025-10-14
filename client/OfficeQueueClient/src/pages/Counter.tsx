import React, { useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/Counter.css';

const services = ["Service 1", "Service 2"];

const Counter: React.FC = () => {
  const { id } = useParams();
  const [currentTicket, setCurrentTicket] = useState<string | null>(null);
  const [serviceType, setServiceType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleNextCustomer = async () => {
    setLoading(true);
    try {
      const response = await fetch("/get_ticket?id_counter=" + id);
      const data = await response.json();
      setCurrentTicket(data.id_ticket);
      setServiceType(data.service_type);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTicket = async () => {
    setLoading(true);
    try {
      await fetch("/complete_ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_ticket: currentTicket,
          id_counter: id,
          service_type: serviceType,
          date: new Date().toISOString()
        })
      });
      setCurrentTicket(null);
      setServiceType(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="counter-container">
      {/* In cima: Counter Info */}
      <div className="counter-info">
        <h2>Counter {id}</h2>
        <p className="counter-services-title">Services:</p>
        <ul className="counter-services-list">
          {services.map(s => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Sotto: due finestre affiancate */}
      <div className="counter-main-row">
        {/* Statistiche varie */}
        <div className="counter-stats">
          <h3>Statistics</h3>
          <p>Here you can show stats, queue length, or other info.</p>
        </div>

        {/* Ticket che si sta servendo */}
        <div className="counter-ticket">
          <h3>Current Ticket</h3>
          {currentTicket ? (
            <>
              <p className="ticket-number">{currentTicket}</p>
              <p>Service: <strong>{serviceType}</strong></p>
              <button className="counter-btn" onClick={handleCompleteTicket} disabled={loading}>
                Complete Ticket
              </button>
            </>
          ) : (
            <p className="ticket-empty">No ticket is being served.</p>
          )}
        </div>
      </div>

      {/* In fondo: Next Customer Button */}
      <div className="counter-footer">
        {!currentTicket && (
          <button className="counter-btn" onClick={handleNextCustomer} disabled={loading}>
            Next Customer
          </button>
        )}
      </div>
    </div>
  );
};

export default Counter;