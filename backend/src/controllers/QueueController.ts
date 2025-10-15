//! CONTROLLER for QUEUEs

import { QueueDTO, createQueueDTO, queueToJSON } from '../models/dto/QueueDTO';
import { getQueues, getLongestQueueByServiceType, addTicketToQueue, popTicketFromQueue, callNextClient } from '../models/dao/QueueDAO';

// ADD TICKET
export const addTicket = (service_type: string, ticket_id: number): QueueDTO | null => {
    // add a new ticket to the shortest queue for a specific service_type
    const updated_queue = addTicketToQueue(service_type, ticket_id);
    return updated_queue ? queueToJSON(updated_queue) : null;
}


// SERVE NEXT CLIENT
export function serveNextClient(service_type: string): {new_ticket: string | null, old_ticket: number | null} | null {
    // call next client now : find the longest queue and serve the first client + and pops the previous ticket from the queue
    const {queue_id, ticket} = popTicketFromQueue(service_type);
    
    // notify the system that the next client is being served
    const new_ticket = callNextClient(queue_id);
    return {new_ticket: new_ticket, old_ticket: ticket};
}


// GET QUEUES
export const getAllQueues = (): QueueDTO[] => {
    // returns the list of all queues
    const queues = getQueues();
    return queues.map(queue => queueToJSON(queue));
}