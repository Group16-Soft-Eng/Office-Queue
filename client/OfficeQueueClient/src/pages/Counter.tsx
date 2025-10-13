import React, { useState } from "react";
import { useParams } from "react-router-dom";

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
    <div
      className="counter-layout"
      style={{
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "stretch",
        justifyContent: "flex-start",
        width: "100vw",
        padding: "2rem 0",
      }}
    >
      {/* In cima: Counter Info */}
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 2px 12px rgba(118,75,162,0.07)",
          padding: "2rem 2.5rem",
          margin: "0 auto",
          width: "90%",
          maxWidth: "900px",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "2rem", color: "#764ba2" }}>Counter {id}</h2>
        <p style={{ margin: "1rem 0 0 0", fontWeight: "bold", color: "#667eea" }}>Services:</p>
        <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "#333" }}>
          {services.map(s => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Sotto: due finestre affiancate */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          width: "90%",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Statistiche varie */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 2px 12px rgba(118,75,162,0.07)",
            padding: "2rem 2.5rem",
            flex: 1,
            minHeight: "220px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h3 style={{ marginTop: 0, color: "#764ba2" }}>Statistics</h3>
          <p>Here you can show stats, queue length, or other info.</p>
        </div>

        {/* Ticket che si sta servendo */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 2px 12px rgba(118,75,162,0.07)",
            padding: "2rem 2.5rem",
            flex: 1,
            minHeight: "220px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <h3 style={{ marginTop: 0, color: "#764ba2" }}>Current Ticket</h3>
          {currentTicket ? (
            <>
              <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#667eea" }}>{currentTicket}</p>
              <p>Service: <strong>{serviceType}</strong></p>
              <button
                style={{
                  background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.8rem 2rem",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  marginTop: "1.2rem",
                  boxShadow: "0 2px 8px rgba(118,75,162,0.08)",
                }}
                onClick={handleCompleteTicket}
                disabled={loading}
              >
                Complete Ticket
              </button>
            </>
          ) : (
            <p style={{ color: "#aaa", fontSize: "1.1rem" }}>No ticket is being served.</p>
          )}
        </div>
      </div>

      {/* In fondo: Next Customer Button */}
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 2px 12px rgba(118,75,162,0.07)",
          padding: "2rem 2.5rem",
          margin: "0 auto",
          width: "90%",
          maxWidth: "900px",
          textAlign: "center",
        }}
      >
        {!currentTicket && (
          <button
            style={{
              background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "0.8rem 2rem",
              fontSize: "1.1rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(118,75,162,0.08)",
            }}
            onClick={handleNextCustomer}
            disabled={loading}
          >
            Next Customer
          </button>
        )}
      </div>
    </div>
  );
};

export default Counter;