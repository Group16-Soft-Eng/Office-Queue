import React from "react";
import TicketPopup from "../components/TicketPopup";
import { useTicket } from "../hooks/useTicket";

const services = [
  { id: "service1", name: "Service 1" },
  { id: "service2", name: "Service 2" },
  { id: "service3", name: "Service 3" },
  { id: "service4", name: "Service 4" }
];

const Customer: React.FC = () => {
  const [ticketVisible, setTicketVisible] = React.useState(false);
  const { ticket, loading, createTicket } = useTicket();

  const [errorTicket, setErrorTicket] = React.useState<{ id_ticket: string; service_type: string } | null>(null);

    const handleGetTicket = async (serviceId: string) => {
    setErrorTicket(null);
    try {
        await createTicket(serviceId);
    } catch {
        setErrorTicket({ id_ticket: "Error", service_type: serviceId });
    }
    setTicketVisible(true);
    };

  const handleClosePopup = () => {
    setTicketVisible(false);
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
        ticketNumber={errorTicket ? errorTicket.id_ticket : ticket?.id_ticket ?? null}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default Customer;