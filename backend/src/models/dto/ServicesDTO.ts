/* tslint:disable */
/* eslint-disable */


//! SERVICES DTO (not in DB, but locally in server managed)

const services: string[] = ["s1", "s2", "s3", "s4"];


// check if service_type is valid
export function checkServiceType(service_type: string): boolean {
  return services.includes(service_type);
}


// get the list of services
export function getServices(): string[] {
  return services;
}

export function createServicesDTO(list: string[]): string[] {
  return list.slice();
}
