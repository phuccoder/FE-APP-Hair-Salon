import {ServiceDTO} from "./Service.dto";

export interface ComboDTO {
    comboID: number;
    comboName: string;
    comboPrice: number;
    comboDescription: string;
    comboDetails: ServiceDTO[];
}
