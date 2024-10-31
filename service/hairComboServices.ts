import {securedHttpClient} from "@/config/authenticated.interceptor";
import {ApplicationConstants} from "@/constants/ApplicationConstants";
import {ComboDTO} from "@/dtos/Combo.dto";
import {Observable} from "rxjs";

export const hairComboServices = {
    getAllCombos: (): Observable<ComboDTO[]> => {
        return securedHttpClient<ComboDTO[]>({
            method: "GET",
            url: `${ApplicationConstants.BASE_URL_WITHOUT_VERSION}/customer/combos/get-all-combos`,
        })
    }
}