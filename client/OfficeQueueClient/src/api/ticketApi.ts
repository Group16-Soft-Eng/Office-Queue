// api for ticket

export async function getTicket() {
  const response = await fetch('/api/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify({ serviceType: ... }) // aggiungi dati se necessario
  });
  if (!response.ok) throw new Error('Errore nella creazione del ticket');
  return response.json();
}