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

export function createQueueDTO(queue_id: string, service_type: string, ticket_list: number[], avg_service_time: number): QueueDTO {
    return {
        queue_id,
        service_type,
        ticket_list,
        avg_service_time
    };
}

export function queueToJSON(json: any): QueueDTO {
    return queueToJSONTyped(json, false);
}

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

