export interface PropertyFormField {
  id: string;
  question: string;
  type: 'text' | 'number' | 'checkbox' | 'select' | 'time' | 'file';
  options?: string[];
  value: string | number | boolean | string[];
  required?: boolean;
  multiple?: boolean;
  accept?: string;
}

export interface Property {
  id: string;
  clientId: string;
  name: string;
  address: string;
  type: string;
  buildingNumber?: string;
  surface: number;
  floor: number;
  door: string;
  doorSlams: boolean;
  emergencyResponseTime: string;
  deposit: number;
  elevator: boolean;
  furnished: boolean;
  wifiName: string;
  wifiPassword: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  keys: {
    total: number;
    available: number;
    lockSystem: string;
    keyImages: string[];
  };
  cleaning: {
    mop: boolean;
    broom: boolean;
    dustpan: boolean;
    vacuumCleaner: boolean;
  };
  transportation: {
    nearestAirport: string;
    airportDirections: string;
    trainStation: string;
    trainDirections: string;
    parking: string;
    parkingAccess: string;
  };
}