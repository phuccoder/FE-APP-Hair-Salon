import AsyncStorage from "@react-native-async-storage/async-storage";
import {ApplicationConstants} from "@/constants/ApplicationConstants";
import {SignInRequest, SignInResponse, SignUpRequest, SuccessResponse} from "@/dtos/Authentication.dto";
import {httpClient} from "@/config/authenticated.interceptor";
import {from, mergeMap, Observable, tap} from "rxjs";

const storeAccessTokenFn = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(ApplicationConstants.ACCESS_TOKEN, token);
    } catch (error) {
        console.error('Failed to save token', error);
    }
};

export const authServices = {
    signIn: (signInRequest: SignInRequest): Observable<SuccessResponse<SignInResponse>> => {
        return httpClient<SuccessResponse<SignInResponse>>({
            method: 'POST',
            url: `${ApplicationConstants.BASE_URL}/v1/user/signIn`,
            data: signInRequest
        }).pipe(
            mergeMap(response =>
                from(storeAccessTokenFn(response.data.accessToken)).pipe(
                    tap((): void => {
                        console.log('Access token saved successfully');
                    }),
                    mergeMap(() => [response])
                )
            )
        );
    },
    signUp: (signUpRequest: SignUpRequest): Observable<void> => {
        return httpClient<void>({
            method: 'POST',
            url: `${ApplicationConstants.BASE_URL}/v1/user/signup`,
            data: signUpRequest
        });
    }
};
