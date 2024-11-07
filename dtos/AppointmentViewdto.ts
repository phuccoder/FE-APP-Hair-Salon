export interface AppointmentDetailView {
    appointmentDetailID: number;
    serviceID: number | null;
    comboID: number | null;
    serviceName: string | null;
    comboName: string | null;
    servicePrice: number | null;
    comboPrice: number | null;
}

export interface Review {
    reviewID: number;
    comment: string;
    reviewRating: number;
    accountID: number;
    appointmentID: number;
    reviewDate: string;
}

export interface Appointment {
    appointmentID: number;
    appointmentDate: string;
    appointmentStatus: string;
    accountID: number;
    stylistID: number;
    voucherID: number | null;
    appointmentPrice: number;
    appointmentDetails: AppointmentDetailView[];
    reviews: Review[];
}

export type AppointmentResponse = Appointment[];