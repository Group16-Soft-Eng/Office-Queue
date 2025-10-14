import React, { useEffect, useRef } from "react";
import '../styles/TicketPopup.css';

interface TicketPopupProps {
  visible: boolean;
  ticketNumber: string | null;
  onClose: () => void;
}

const TicketPopup: React.FC<TicketPopupProps> = ({ visible, ticketNumber, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (visible) {
      timer = setTimeout(onClose, 10000);
    }
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="ticket-popup-overlay">
      <div className="ticket-popup" ref={popupRef}>
        <div className="ticket-popup-header">
          <h3>Your Ticket</h3>
        </div>
        <div className="ticket-popup-body">
          <div className="ticket-number">{ticketNumber}</div>
          <p>Please wait for your number to be called</p>
        </div>
      </div>
    </div>
  );
};

export default TicketPopup;