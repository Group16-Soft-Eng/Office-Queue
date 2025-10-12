/**
 * Controller for managing queues in the office
 * Receive requests from Router and interact with QueueDAO
 */

// import necessary DTOs and DAO functions
import { QueueDTO, createQueueDTO, queueToJSON } from '../models/dto/QueueDTO';
import { getQueues, getLongestQueueByServiceType, addTicketToQueue, popTicketFromQueue, callNextClient } from '../models/dao/QueueDAO';

// GET QUEUES - returns the list of all queues
export const getAllQueues = (): QueueDTO[] => {
    const queues = getQueues();
    return queues.map(queue => queueToJSON(queue));
}

// add a new ticket to the shortest queue for a specific service_type
export const addTicket = (service_type: string, ticket_id: number): QueueDTO | null => {
    const updated_queue = addTicketToQueue(service_type, ticket_id);
    return updated_queue ? queueToJSON(updated_queue) : null;
}

/**
 * NOTE: probably it 's better to unify popTicket and serveNextClient in a single function
 * since once we pop a ticket from the queue, we are serving the next client
 */

// serve next client from the longest queue for a specific service_type
// and pops the previous ticket from the queue
export function serveNextClient(service_type: string): {new_ticket: string | null, old_ticket: number | null} | null {
    // call next client now : find the longest queue and serve the first client
    const {queue_id, ticket} = popTicketFromQueue(service_type);
    const new_ticket = callNextClient(queue_id); // notify the system that the next client is being served
    return {new_ticket: new_ticket, old_ticket: ticket};
}