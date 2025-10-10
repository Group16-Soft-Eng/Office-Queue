/**
 * Data Transfer Object for Counter
 * with the following structure:
 * 
 * {
    id: "c1",
    services : [ 1 , 2 , 4 ... ],
    is_active: boolean
 * }
 */

export class CounterDTO {
    counter_id: number;     // Id of counter out of 4
    services?: Array<number>;     // array of current service_type
    is_active: boolean;     // true if counter is active
}

export function createCounterDTO(counter_id: number, services: Array<number>, is_active: boolean): CounterDTO {
    return {
        counter_id,
        services,
        is_active
    };
}

export function setActive(counter: CounterDTO, counter_id: number): CounterDTO {
    counter.is_active = true;
    return counter;
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

/*
export function SensorToJSON(json: any): Sensor {
  return SensorToJSONTyped(json, false);
}

export function SensorToJSONTyped(
  value?: Sensor | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }
 return {
    macAddress: value["macAddress"],
    name: value["name"],
    description: value["description"],
    variable: value["variable"],
    unit: value["unit"]
  };
}
*/