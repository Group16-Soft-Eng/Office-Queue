/* tslint:disable */
/* eslint-disable */

//! COUNTER DTO INTERFACE

/**
 * {
    id: "c1",
    services : [ 1 , 2 , 4 ... ],
    is_active: boolean
 * }
 */

export interface CounterDTO {
    counter_id: number;     // Id of counter out of 4
    services?: Array<string>;     // array of current service_type
    is_active: boolean;     // true if counter is active
}

// config 4 counters for the office
let counters: CounterDTO[] = [];

// initialize the list of counters if not already initialized
export function initializeCounters(): CounterDTO[] {
    if (counters.length == 0) {
        counters = [
        createCounterDTO(1, [], false),
        createCounterDTO(2, [], false),
        createCounterDTO(3, [], false),
        createCounterDTO(4, [], false)
    ];
    }else{
        return counters; 
    }
}

export function createCounterDTO(counter_id: number, services: Array<string>, is_active: boolean): CounterDTO {
    return {
        counter_id,
        services,
        is_active
    };
}

// set a counter to active and return the updated list of counters
export function setActive(counter_id: number): CounterDTO | null {
    if (!checkCounterId(counter_id)) {
        return null;    // If the counter_id is invalid, return a default inactive counter
    }
    const counter = counters.find(c => c.counter_id === counter_id);
    if (counter) { // if found
        counter.is_active = true; // set to active
        //update the list of counters
        counters = counters.map(c => c.counter_id === counter_id ? counter : c);
        return counter;
    }
    return null;
}

// set a counter to inactive and return the updated counter
export function setInactive(counter_id: number): CounterDTO | null {
    if (!checkCounterId(counter_id)) {
        return null;    // If the counter_id is invalid, return a default inactive counter
    }
    const counter = counters.find(c => c.counter_id === counter_id);
    if (counter) { // if found
        counter.is_active = false; // set to inactive
        // empty all services
        counter.services = [];
        //update the list of counters
        counters = counters.map(c => c.counter_id === counter_id ? counter : c);
        return counter;
    }
    return null;
}

// add new Service of a counter and return the updated counter
export function addService(counter_id: number, new_service: string): CounterDTO | null {
    if (!checkCounterId(counter_id)) {
        return null;    // If the counter_id is invalid, return a default inactive counter
    }
    const counter = counters.find(c => c.counter_id === counter_id);
    if (counter) { // if found
        counter.services.push(new_service); // add new service
        //update the list of counters
        counters = counters.map(c => c.counter_id === counter_id ? counter : c);
        return counter;
    }
    return null;
}

// remove new Service of a counter and return the updated counter
export function removeService(counter_id: number, service: string): CounterDTO | null {
    if (!checkCounterId(counter_id)) {
        return null;    // If the counter_id is invalid, return a default inactive counter
    }
    const counter = counters.find(c => c.counter_id === counter_id);
    if (counter) { // if found
        counter.services = counter.services.filter((s: string) => s !== service); // remove service
        //update the list of counters
        counters = counters.map(c => c.counter_id === counter_id ? counter : c);
        return counter;
    }
    return null;
}

// get the list of counters
export function getCounters(): CounterDTO[] {
    return counters;
}

// SERVICE for counters
function checkCounterId(counter_id: number): boolean {
    return counter_id >= 1 && counter_id <= 4;
}


export function counterToJSON(json: any): CounterDTO {
    return counterToJSONTyped(json, false);
}

export function counterToJSONTyped(
    value?: CounterDTO | null,
    ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }
    return {
        counter_id: value["counter_id"],
        services: value["services"],
        is_active: value["is_active"]
    };
}

// export all counters in json format
export function countersToJSON(json: any): CounterDTO[] {
    return CountersToJSONTyped(json, false);
}

export function CountersToJSONTyped(value?: CounterDTO[] | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        counter_id: value['counter_id'],
        services: value['services'],
        is_active: value['is_active']
    };

}


export default counters;