import React, { useState } from "react";
import TicketPopup from "../components/TicketPopup";
import { getTicket } from "../api/ticketApi";

const services = [
  { id: "service1", name: "Service 1" },
  { id: "service2", name: "Service 2" },
  { id: "service3", name: "Service 3" },
  { id: "service4", name: "Service 4" }
];

const Customer: React.FC = () => {
  const [ticketVisible, setTicketVisible] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);

  const handleGetTicket = async (serviceId: string) => {
    try {
      const data = await getTicket(serviceId);
      setTicketNumber(data.number ?? "N/A");
      setTicketVisible(true);
    } catch {
      setTicketNumber("Errore");
      setTicketVisible(true);
    }
  };

  const handleClosePopup = () => {
    setTicketVisible(false);
    setTicketNumber(null);
  };

  return (
    <>
      <div className="window modal-window">
        <div className="modal-header">
          <h2>Customer Service</h2>
        </div>
        <div className="modal-body">
          <p>Choose a service:</p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            {services.map(service => (
              <button
                key={service.id}
                className="ticket-btn"
                onClick={() => handleGetTicket(service.id)}
              >
                {service.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      {ticketVisible && (
        <TicketPopup
          visible={ticketVisible}
          ticketNumber={ticketNumber}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default Customer;