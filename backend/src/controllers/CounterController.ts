//! CONTROLLER for COUNTERs

import {CounterDTO, createCounterDTO, counterToJSON} from '@models/dto/CounterDTO';
import {getCounters, setActive, addService, setInactive, removeService} from '@models/dao/CounterDAO';


// OPEN A COUNTER
export const openCounter = (counter_id: number, services?: Array<string>): CounterDTO => {
    // set active to true
    const open_counter = setActive(counter_id);
    // if counter_id invalid, return null
    if (!open_counter) { return null; }
    const counter_json = counterToJSON(open_counter);
    return counter_json;
};


// CLOSE A COUNTER
//TODO: scheletro da implementare
export const closeCounter = (counter_id: number): CounterDTO => {
    // set active to false
    const closed_counter = setInactive(counter_id);
    // if counter_id invalid, return null
    if (!closed_counter) { return null; }
    
    const counter_json = counterToJSON(closed_counter);
    return counter_json;
};


// UPDATE SERVICES
export const addCounterService = (counter_id: number, service: string, is_active: boolean): CounterDTO => {
    // updates the services handled by the counter
    const updated_counter = addService(counter_id, service);
    // if counter_id invalid, return null
    if (!updated_counter) { return null; }
    
    const counter_json = counterToJSON(updated_counter);
    return counter_json;
}


// REMOVE SERVICE
//TODO: scheletro da implementare
export const removeCounterService = (counter_id: number, service: string): CounterDTO => {
    //TODO: check if counter_id is valid and service is valid --> not implemented
    // removes a service from the counter
    const updated_counter = removeService(counter_id, service);
    // if counter_id invalid, return null
    if (!updated_counter) { return null; }
    
    const counter_json = counterToJSON(updated_counter);
    return counter_json;
}

// GET COUNTERS
export const getAllCounters = (): CounterDTO[] => {
    // returns the list of all counters
    const counters = getCounters();
    return counters.map(counter => counterToJSON(counter));
}