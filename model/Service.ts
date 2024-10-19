export interface ComboRequest {
  comboName: string;
  comboPrice: number;
  comboDescription: string;
}

export interface Combo {
  comboID: number;
  comboName: string;
  comboPrice: number;
  comboDescription: string;
  comboDetails: ComboDetail[];
}

interface ComboDetail {
  comboDetailID: number;
  serviceID: number;
  serviceName: string;
  servicePrice: number;
}

export interface Service {
  serviceID: number;
  serviceName: string;
  servicePrice: number;
}
