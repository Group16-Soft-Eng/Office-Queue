// Customer.tsx
import React from "react";
import TicketPopup from "../components/TicketPopup";
import '../styles/Customer.css';

const Customer: React.FC = () => {
  // State variables to manage the component
  const [ticketVisible, setTicketVisible] = React.useState(false);      // Show/hide ticket popup
  const [errorTicket, setErrorTicket] = React.useState<string | null>(null); // Error messages
  const [activeServices, setActiveServices] = React.useState<number[]>([]);  // List of active service IDs
  const [currentTicket, setCurrentTicket] = React.useState<string | null>(null); // Current ticket number
  const [estimatedTime, setEstimatedTime] = React.useState<string>(''); // Estimated wait time
  const [loading, setLoading] = React.useState(false);                  // Loading state during ticket creation

  // Load active services when component first loads
  React.useEffect(() => {
    const saved = localStorage.getItem('selectedServices');
    if (saved) {
      setActiveServices(JSON.parse(saved));
    }
  }, []);

  // Calculate how long the customer will have to wait
  const calculateEstimatedTime = (serviceId: number): string => {
    // Get current queue length for this service
    const queueKey = `service_${serviceId}_queue`;
    const existingQueue = localStorage.getItem(queueKey);
    const queueLength = existingQueue ? JSON.parse(existingQueue).length : 0;
    
    // Calculate wait time: 5 minutes per person in queue (including yourself)
    const averageServiceTimeMinutes = 5;
    const totalWaitMinutes = (queueLength + 1) * averageServiceTimeMinutes;
    
    // Format the time nicely
    if (totalWaitMinutes < 60) {
      return `${totalWaitMinutes} minutes`;
    } else {
      const hours = Math.floor(totalWaitMinutes / 60);
      const minutes = totalWaitMinutes % 60;
      return `${hours}h ${minutes}m`;
    }
  };

  // Handle when customer clicks a service button
  const handleGetTicket = async (serviceId: number) => {
    // Check if service is active
    if (!activeServices.includes(serviceId)) {
      setErrorTicket("This service is not active right now.");
      setTicketVisible(true);
      return;
    }

    setLoading(true);
    setErrorTicket(null);
    
    try {
      // Create a new ticket number
      const ticketNumber = generateTicketNumber(serviceId);
      setCurrentTicket(ticketNumber);
      
      // Calculate how long they'll wait
      const estimatedWait = calculateEstimatedTime(serviceId);
      setEstimatedTime(estimatedWait);
      
      // Add this ticket to the service queue
      addTicketToQueue(serviceId, ticketNumber);
      
    } catch {
      setErrorTicket("Error creating ticket");
    } finally {
      setLoading(false);
      setTicketVisible(true);
    }
  };

  // Generate a unique ticket number like "S1-001"
  const generateTicketNumber = (serviceId: number): string => {
    // Get and update the ticket counter for this service
    const count = parseInt(localStorage.getItem(`service_${serviceId}_ticketCount`) || '0') + 1;
    localStorage.setItem(`service_${serviceId}_ticketCount`, count.toString());
    // Format as S1-001, S2-001, etc.
    return `S${serviceId}-${count.toString().padStart(3, '0')}`;
  };

  // Add the new ticket to the service queue
  const addTicketToQueue = (serviceId: number, ticketNumber: string) => {
    const queueKey = `service_${serviceId}_queue`;
    const existingQueue = localStorage.getItem(queueKey);
    const queue = existingQueue ? JSON.parse(existingQueue) : [];
    
    // Add new ticket to end of queue
    const updatedQueue = [...queue, ticketNumber];
    localStorage.setItem(queueKey, JSON.stringify(updatedQueue));
  };

  // Close the ticket popup
  const handleClosePopup = () => {
    setTicketVisible(false);
    setErrorTicket(null);
    setCurrentTicket(null);
    setEstimatedTime('');
  };

  // List of all available services
  const services = [
    { id: 1, name: "Service 1" },
    { id: 2, name: "Service 2" },
    { id: 3, name: "Service 3" },
    { id: 4, name: "Service 4" },
    { id: 5, name: "Service 5" }
  ];

  // Get how many people are waiting in a service queue
  const getQueueLength = (serviceId: number): number => {
    const queueKey = `service_${serviceId}_queue`;
    const existingQueue = localStorage.getItem(queueKey);
    return existingQueue ? JSON.parse(existingQueue).length : 0;
  };

  return (
    <div className="customer-container">
      <div className="customer-window">
        <div className="customer-header">
          <h2>Customer Service</h2>
          <p>Choose an active service to get a ticket:</p>
        </div>
        <div className="customer-body">
          <div className="customer-services">
            {/* Create buttons for each service */}
            {services.map(service => {
              const queueLength = getQueueLength(service.id);
              const isActive = activeServices.includes(service.id);
              const estimatedTime = isActive ? calculateEstimatedTime(service.id) : 'N/A';
              
              return (
                <button
                  key={service.id}
                  className={`ticket-btn ${isActive ? 'active' : 'inactive'}`}
                  onClick={() => handleGetTicket(service.id)}
                  disabled={loading || !isActive}
                >
                  <div className="service-name">{service.name}</div>
                  {/* Show queue info only for active services */}
                  {isActive && (
                    <div className="service-info">
                      <div className="queue-length">{queueLength} in queue</div>
                      <div className="estimated-time">~{estimatedTime}</div>
                    </div>
                  )}
                  {/* Show inactive label for inactive services */}
                  {!isActive && <div className="inactive-label">(Inactive)</div>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Show ticket popup when needed */}
      {ticketVisible && (
        <TicketPopup
          visible={ticketVisible}
          ticketNumber={errorTicket ? errorTicket : currentTicket}
          estimatedTime={estimatedTime}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default Customer;