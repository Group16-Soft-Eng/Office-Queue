import React from "react";
import TicketPopup from "../components/TicketPopup";
import { useTicket } from "../hooks/useTicket";
import '../styles/Customer.css';

const services = [
  { id: "service1", name: "Service 1" },
  { id: "service2", name: "Service 2" },
  { id: "service3", name: "Service 3" },
  { id: "service4", name: "Service 4" }
];

const Customer: React.FC = () => {
  const [ticketVisible, setTicketVisible] = React.useState(false);
  const [errorTicket, setErrorTicket] = React.useState<string | null>(null);
  const { ticket, loading, createTicket } = useTicket();

  const handleGetTicket = async (serviceId: string) => {
    setErrorTicket(null);
    try {
      await createTicket(serviceId);
    } catch {
      setErrorTicket("Errore");
    }
    setTicketVisible(true);
  };

  const handleClosePopup = () => {
    setTicketVisible(false);
    setErrorTicket(null);
  };

  return (
    <div className="customer-container">
      <div className="customer-window">
        <div className="customer-header">
          <h2>Customer Service</h2>
        </div>
        <div className="customer-body">
          <p>Choose a service:</p>
          <div className="customer-services">
            {services.map(service => (
              <button
                key={service.id}
                className="ticket-btn"
                onClick={() => handleGetTicket(service.id)}
                disabled={loading}
              >
                {loading ? "Creating..." : service.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      {ticketVisible && (
        <TicketPopup
          visible={ticketVisible}
          ticketNumber={errorTicket ? errorTicket : ticket?.id_ticket ?? null}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default Customer;