/**
 * Controller for managing counters
 * 
 */

import {CounterDTO, createCounterDTO, counterToJSON} from '../models/dto/CounterDTO';

let counter1: CounterDTO;
let counter2: CounterDTO;
let counter3: CounterDTO;
let counter4: CounterDTO;

// OPEN A COUNTER - sets active state to true
export const openCounter = (counter_id: number, services: Array<number>): CounterDTO => {
    // When opening a counter, it must be set to active
    const open_counter = createCounterDTO(counter_id, services, true);
    // return JSON object of opened counter
    const counter_json = counterToJSON(open_counter);

    return counter_json;
};

// CLOSE A COUNTER - sets active state to false
export const closeCounter = (counter_id: number): CounterDTO => { // scheletro da implementare
    return createCounterDTO(counter_id, [], false);
};

// UPDATE SERVICES - updates the services handled by the counter
export const updateCounterServices = (counter_id: number, services: Array<number>, is_active: boolean): CounterDTO => {
    return createCounterDTO(counter_id, services, is_active);
}