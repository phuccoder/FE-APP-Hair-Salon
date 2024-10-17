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
  services: any[];
}
