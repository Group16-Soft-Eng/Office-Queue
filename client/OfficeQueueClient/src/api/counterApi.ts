const URI = 'http://localhost:5000/'

export async function getNextCustomer(id_counter: number) {
    const response = await fetch(`${URI}/next_Customer?id_counter=${encodeURIComponent(id_counter)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) throw new Error('Error fetching next customer');
    return response.json();
}

export async function registerCounter(id: number, services: string[]) {
    const response = await fetch(`${URI}/register_counter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, services })
    });
    if (!response.ok) throw new Error('Error registering counter');
    return response.json();
}