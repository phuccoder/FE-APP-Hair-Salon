import {securedHttpClient} from "@/config/authenticated.interceptor";
import {ApplicationConstants} from "@/constants/ApplicationConstants";
import {StylistDTO} from "@/dtos/Stylist.dto";
import {Observable} from "rxjs";
import {SuccessResponse} from "@/dtos/Authentication.dto";

export const hairStylistServices = {
    getAllStylist: (): Observable<SuccessResponse<StylistDTO[]>> => {
        return securedHttpClient<SuccessResponse<StylistDTO[]>>({
            method: "GET",
            url: `${ApplicationConstants.BASE_URL_WITHOUT_VERSION}/customer/stylist/get-all-stylists`,
        })
    }
}