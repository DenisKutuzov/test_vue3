export interface ICarData {
    carId: string;
    investorFullName: string;
    taxiServiceId: string;
    brand: string;
    model: string;
    number: string;
    vin: string;
    categories: string[];
    callsign: string;
    color: string;
    amenities: string[];
    registrationCert: string;
    status: string;
    year: number;
    creationDate: string;
    isShowSchedule: boolean;
    isAllowReport: boolean;
    isAllowFines: boolean;
    parkId: string;
    regionParkId: string;
    mileage: number;
    validate: boolean;
    validateReason: string;
}