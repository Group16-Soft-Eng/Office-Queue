// api for ticket

const URI = 'http://localhost:5000'

export async function getTicket(s_type: string) {
  const response = await fetch(`${URI}/ticket/get_ticket?s_type=${encodeURIComponent(s_type)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!response.ok) throw new Error('Error during ticket creation');
  return response.json();
}

export async function completeTicket(ticket: string) {
  const response = await fetch(`${URI}/complete_ticket`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ticket })
  });
  if (!response.ok) throw new Error('Error during ticket completion');
  return response.json();
}