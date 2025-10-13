// api for ticket

export async function getTicket(serviceType: string) {
  const response = await fetch('http://localhost:5000/ticket', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ serviceType }) // requested service
  });
  if (!response.ok) throw new Error('Error during ticket creation');
  return response.json();
}