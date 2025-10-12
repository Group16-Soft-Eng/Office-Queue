/**
 * Data Transfer Object for Queue
 * with the following structure:
 * {
    service_type: "id_s",
    ticket_list : [1,2,3,4 ...],
    avg_service_time : UTC_seconds
}
*/

export class QueueDTO {
    queue_id: string;
    service_type: string;       // string oppure definire enum?
    ticket_list: number[];      // array of ticket object or ticket numbers
    avg_service_time: number;   // in minutes , rounded to nearest integer
}

// factory function to create a QueueDTO
export function createQueueDTO(queue_id: string, service_type: string, ticket_list: number[], avg_service_time?: number): QueueDTO {
    return {
        queue_id,
        service_type,
        ticket_list,
        avg_service_time
    };
}

// convert a JSON object to QueueDTO
export function queueToJSON(json: any): QueueDTO {
    return queueToJSONTyped(json, false);
}

// convert a JSON object to QueueDTO with type checking
export function queueToJSONTyped(
    value?: QueueDTO | null,
    ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }
    return {
        queue_id: value["queue_id"],
        service_type: value["service_type"],
        ticket_list: value["ticket_list"],
        avg_service_time: value["avg_service_time"]
    };
}

/**
 * SERVICES FOR QUEUES
 */
// check if queue_id is valid
export function checkQueueId(queue_id: string): boolean {
    const valid_queue_ids = ["q1", "q2", "q3", "q4"];
    return valid_queue_ids.includes(queue_id);
}