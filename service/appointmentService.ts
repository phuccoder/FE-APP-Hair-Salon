import { securedHttpClient } from "@/config/authenticated.interceptor";
import { ApplicationConstants } from "@/constants/ApplicationConstants";
import { CreateAppointmentRequest } from "@/dtos/Appointment.dto";
import { SuccessResponse } from "@/dtos/Authentication.dto";
import { Observable } from "rxjs";
export const AppointmentService = {
    createAppointment: (data: CreateAppointmentRequest, token: string): Observable<SuccessResponse<any>> => {
      return securedHttpClient<SuccessResponse<any>>({
        method: "POST",
        url: `${ApplicationConstants.BASE_URL_WITHOUT_VERSION}/customer/appointment/create`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      });
    },
  };