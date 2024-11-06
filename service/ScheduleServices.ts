import { securedHttpClient } from "@/config/authenticated.interceptor";
import { ApplicationConstants } from "@/constants/ApplicationConstants";
import { SuccessResponse } from "@/dtos/Authentication.dto";
import { Schedule } from "@/dtos/Schedule.dto";
import { Observable } from "rxjs";

export const ScheduleService = {
  getSchedulesByStylistId: (stylistID: number, token: string): Observable<SuccessResponse<Schedule[]>> => {
    return securedHttpClient<SuccessResponse<Schedule[]>>({
      method: "GET",
      url: `${ApplicationConstants.BASE_URL_WITHOUT_VERSION}/schedules-management/get-by-stylist-id/${stylistID}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};