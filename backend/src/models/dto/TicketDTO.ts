/* tslint:disable */
/* eslint-disable */

//! TICKET DTO INTERFACE

export interface Ticket {
	// Ticket unique identifier
	id_ticket?: number;
    
	// Counter identifier (which served the ticket)
	id_counter?: number;

	// Service type
	service_type?: string;

	// Date/time of ticket completion (ISO 8601 string)
	date?: string;
}

export function instanceOfTicket(value: object): value is Ticket {
	return (
		value != null &&
		Object.prototype.hasOwnProperty.call(value, "id_ticket")
	);
}

export function TicketFromJSON(json: any): Ticket {
	return TicketFromJSONTyped(json, false);
}

export function TicketFromJSONTyped(json: any, ignoreDiscriminator: boolean): Ticket {

    // if json is undefined or null return it (json = input value to parse)
	if (json == null) {
		return json;
	}

	return {
		id_ticket: json["id_ticket"] == null ? undefined : json["id_ticket"],
		id_counter: json["id_counter"] == null ? undefined : json["id_counter"],
		service_type: json["service_type"] == null ? undefined : json["service_type"],
		date: json["date"] == null ? undefined : json["date"]
	};
}

export function TicketToJSON(value?: Ticket | null): any {
	return TicketToJSONTyped(value, false);
}

export function TicketToJSONTyped(value?: Ticket | null, ignoreDiscriminator: boolean = false): any {
	if (value == null) {
		return value;
	}

	return {
		id_ticket: value["id_ticket"],
		id_counter: value["id_counter"],
		service_type: value["service_type"],
		date: value["date"]
	};
}
