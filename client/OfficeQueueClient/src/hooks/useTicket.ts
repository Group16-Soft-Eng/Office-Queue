import { useState, useEffect } from 'react';
import { fetchTickets } from '../api/ticketApi';

export function useTicket() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets()
      .then(data => setTickets(data))
      .finally(() => setLoading(false));
  }, []);

  return { tickets, loading };
}