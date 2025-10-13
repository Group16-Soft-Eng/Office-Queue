import { useState } from 'react';
import { getTicket } from '../api/ticketApi';

export interface Ticket {
  id_ticket?: string;
  id_counter?: number;
  service_type?: string;
  date?: string;
}

export function useTicket() {

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);
  const createTicket = async (serviceType: string) => {
    setLoading(true);
    try {
      const data = await getTicket(serviceType);
      setTicket(data);
    } finally {
      setLoading(false);
    }
  };

  return { ticket, loading, createTicket };
}