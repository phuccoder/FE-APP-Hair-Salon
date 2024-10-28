import { securedHttpClient } from "@/config/authenticated.interceptor";
import { ApplicationConstants } from "@/constants/ApplicationConstants";
import { ServiceDTO } from "@/dtos/Service.dto";
import { Observable } from "rxjs";

export const hairServices = {
    getAllService: (): Observable<ServiceDTO[]> => { 
        return securedHttpClient<ServiceDTO[]> ({
            method: "GET", 
            url: `${ApplicationConstants.BASE_URL_WITHOUT_VERSION}/services-management`,
        })
    }
}