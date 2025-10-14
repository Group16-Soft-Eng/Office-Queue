/**
 * Dao for Queue - locally managed
 * No database interaction
 */

import { QueueDTO, createQueueDTO } from "../dto/QueueDTO";
import { checkServiceType } from "../dto/ServicesDTO";

/**
 * Queue structure: 
 * {
    "queue_id": "q1",
    "service_type": "id_s",
    "ticket_list": [1, 2, 3, 4, ...],
    "avg_service_time": "seconds"
   }
 * 
 */
// config 4 queues for the office
let queues = [
    createQueueDTO("q1", "", []),
    createQueueDTO("q2", "", []),
    createQueueDTO("q3", "", []),
    createQueueDTO("q4", "", [])
];


// get the list of queues
export function getQueues(): QueueDTO[] {
    return queues;
}

// get the longest queue for a specific service_type
export function getLongestQueueByServiceType(service_type: string): QueueDTO | null {
    if (!checkServiceType(service_type)) {
        return null;
    }
    return queues
        .filter(q => q.service_type === service_type)
        .reduce((prev, curr) => (prev.ticket_list.length > curr.ticket_list.length ? prev : curr), queues[0]); // find the longest queue for a service_type
}

// get the shortest queue for a specific service_type
export function getShortestQueueByServiceType(service_type: string): QueueDTO | null {
    if (!checkServiceType(service_type)) {
        return null;
    }
    return queues
        .filter(q => q.service_type === service_type)
        .reduce((prev, curr) => (prev.ticket_list.length < curr.ticket_list.length ? prev : curr), queues[0]); // find the shortest queue for a service_type
}

// add a new ticket to the shortest queue for a specific service_type
export function addTicketToQueue(service_type: string, ticket_id: number): QueueDTO | null {
    if (!checkServiceType(service_type)) {
        return null;
    }
    const queue = getShortestQueueByServiceType(service_type);
    if (queue) {
        queue.ticket_list.push(ticket_id);
        return queue;
    }
    return null;
}

// pop a ticket from a specific queue
export function popTicketFromQueue(service_type: string): {queue_id: string, ticket: number | null} | null {
    if (!checkServiceType(service_type)) {
        return null;
    }
    const queue = queues.find(q => q.service_type === service_type);
    if (queue) {
        if (queue.ticket_list.length === 0) {
            return null; // queue is empty
        }
        const prev_ticket = queue.ticket_list.shift() || null;
        return {queue_id: queue.queue_id, ticket: prev_ticket}; // return the first ticket in the queue
    }
}

// serve next client from the longest queue for a specific service_type
export function callNextClient(queue_id: string): string | null {
    const longest_queue = getLongestQueueByServiceType(queue_id);
    if (longest_queue) {
        return longest_queue.queue_id; // return the first ticket in the longest queue
    }
    return null;
}

//check if queue_id is valid
export function checkQueueId(queue_id: string): boolean { 
    return queues.some(q => q.queue_id === queue_id); // some: for every element of the array
}
