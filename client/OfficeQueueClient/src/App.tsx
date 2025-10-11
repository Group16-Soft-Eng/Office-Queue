import React, { useState, useEffect, useRef } from "react";
import "./App.css";

type View = "main" | "customer" | "ticket";

const App: React.FC = () => {
  const [view, setView] = useState<View>("main");
  const [ticketVisible, setTicketVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Handle ticket popup timeout
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (ticketVisible) {
      timer = setTimeout(() => {
        setTicketVisible(false);
        setView("main");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [ticketVisible]);

  // Handle click outside popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setTicketVisible(false);
        setView("main");
      }
    };

    if (ticketVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ticketVisible]);

  return (
    <div className="app">
      {view === "main" && (
        <div className="window">
          <h1 className="app-title">Queue Management System</h1>
          <div className="button-group">
            <button className="menu-btn admin-btn">Admin</button>
            <button className="menu-btn officer-btn">Officer</button>
            <button 
              className="menu-btn customer-btn" 
              onClick={() => setView("customer")}
            >
              Customer
            </button>
          </div>
        </div>
      )}

      {view === "customer" && (
        <div className="modal-overlay">
          <div className="window modal-window">
            <div className="modal-header">
              <h2>Customer Service</h2>
            </div>
            <div className="modal-body">
              <p>Click below to get your ticket</p>
              <button 
                className="ticket-btn" 
                onClick={() => setTicketVisible(true)}
              >
                Get Ticket
              </button>
            </div>
            <div className="modal-footer">
              <button className="back-btn" onClick={() => setView("main")}>
                ← Back to Main
              </button>
            </div>
          </div>
        </div>
      )}

      {ticketVisible && (
        <div className="popup-overlay">
          <div className="popup" ref={popupRef}>
            <div className="popup-header">
              <h3>Your Ticket</h3>
            </div>
            <div className="popup-body">
              <div className="ticket-number">T1</div>
              <p>Please wait for your number to be called</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;