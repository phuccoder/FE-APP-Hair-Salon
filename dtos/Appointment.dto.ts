 export interface AppointmentDetail {
    serviceID?: number;
    comboID?: number;
  }
  
 export interface CreateAppointmentRequest {
    appointmentDate: string;
    accountID: number;
    stylistID: number;
    details: AppointmentDetail[];
  }