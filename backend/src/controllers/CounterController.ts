/**
 * Controller for managing counters
 * 
 */

import {CounterDTO, createCounterDTO, counterToJSON} from '../models/dto/CounterDTO';
import {getCounters, setActive, addService, setInactive, removeService} from '../models/dao/counterDAO';

// OPEN A COUNTER - sets active state to true
export const openCounter = (counter_id: number, services?: Array<string>): CounterDTO => {
    // When opening a counter, it must be set to active
    const open_counter = setActive(counter_id);
    if (!open_counter) {
        return null;    // If the counter_id is invalid, return a default inactive counter
    }
    // return JSON object of opened counter
    const counter_json = counterToJSON(open_counter);

    return counter_json;
};

// CLOSE A COUNTER - sets active state to false
export const closeCounter = (counter_id: number): CounterDTO => { // scheletro da implementare
    const closed_counter = setInactive(counter_id);
    if (!closed_counter) {
        return null;    // If the counter_id is invalid, return a default inactive counter
    }
    // return JSON object of closed counter
    const counter_json = counterToJSON(closed_counter);
    return counter_json;
};

// UPDATE SERVICES - updates the services handled by the counter
export const addCounterService = (counter_id: number, service: string, is_active: boolean): CounterDTO => {
    const updated_counter = addService(counter_id, service);
    if (!updated_counter) {
        return null;    // If the counter_id is invalid, return a default inactive counter
    }
    // return JSON object of updated counter
    const counter_json = counterToJSON(updated_counter);
    return counter_json;
}

// REMOVE SERVICE - removes a service from the counter
export const removeCounterService = (counter_id: number, service: string): CounterDTO => {  // scheletro da implementare
    // check if counter_id is valid and service is valid --> not implemented
    const updated_counter = removeService(counter_id, service);
    if (!updated_counter) {
        return null;    // If the counter_id is invalid, return a default inactive counter
    }
    // return JSON object of updated counter
    const counter_json = counterToJSON(updated_counter);
    return counter_json;
}

// GET COUNTERS - returns the list of all counters
export const getAllCounters = (): CounterDTO[] => {
    const counters = getCounters();
    return counters.map(counter => counterToJSON(counter));
}