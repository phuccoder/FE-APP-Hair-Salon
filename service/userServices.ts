import { securedHttpClient } from "@/config/authenticated.interceptor";
import { ApplicationConstants } from "@/constants/ApplicationConstants";
import { SuccessResponse, TokenPayload } from "@/dtos/Authentication.dto";
import { UserDetailsDTO } from "@/dtos/User.dto";
import { mergeMap, Observable } from "rxjs";
import { authServices } from "./authServices";
import { AppointmentResponse } from "@/dtos/Appointment.dto";

export const userServices = {
    getCurrentUser: (): Observable<SuccessResponse<UserDetailsDTO>> => {
        return authServices.extractToken().pipe(
            mergeMap((payload: TokenPayload) => {
                const userId = payload.sub;
                return securedHttpClient<SuccessResponse<UserDetailsDTO>>({
                    method: 'GET',
                    url: `${ApplicationConstants.BASE_URL}/user/${userId}`
                });
            })
        );
    },
    getAppointmentOfCurrentUser: (): Observable<SuccessResponse<AppointmentResponse>> => {
        return authServices.extractToken().pipe(
            mergeMap((payload: TokenPayload) => {
                const userId = payload.sub;
                return securedHttpClient<SuccessResponse<AppointmentResponse>>({
                    method: 'GET',
                    url: `http://34.126.80.91:8085/api/customer/appointment/get-by-account-id/${userId}`
                });
            })
        );
    },
    getAppointmentDetail: (appointmentId: number): Observable<SuccessResponse<AppointmentResponse>> => {
        return securedHttpClient<SuccessResponse<AppointmentResponse>>({
            method: 'GET',
            url: `http://34.126.80.91:8085/api/customer/appointment/get-by-appointment-id/${appointmentId}`
        });
    }
};