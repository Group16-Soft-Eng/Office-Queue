/**
 * SERVICES FOR QUEUES - locally defined
 * no database interaction
 */

const services = ["s1", "s2", "s3", "s4"];

// check if service_type is valid
export function checkServiceType(service_type: string): boolean {
    return services.includes(service_type);
}

// get the list of services
export function getServices(): string[] {
    return services;
}