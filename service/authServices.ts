import {httpClient} from "@/config/authenticated.interceptor";
import {ApplicationConstants} from "@/constants/ApplicationConstants";
import {SignInRequest, SignInResponse, SignUpRequest, SuccessResponse, TokenPayload} from "@/dtos/Authentication.dto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";
import {from, mergeMap, Observable, of, tap, throwError} from "rxjs";

const storeAccessTokenFn = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(ApplicationConstants.ACCESS_TOKEN, token);
    } catch (error) {
        console.error('Failed to save token', error);
    }
};

const removeAccessTokenFn = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(ApplicationConstants.ACCESS_TOKEN);
    } catch (error) {
        console.error('Failed to remove token', error);
    }
};

export const authServices = {
    signIn: (signInRequest: SignInRequest): Observable<SuccessResponse<SignInResponse>> => {
        return httpClient<SuccessResponse<SignInResponse>>({
            method: 'POST',
            url: `${ApplicationConstants.BASE_URL}/user/signIn`,
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
    },
    extractToken: (): Observable<TokenPayload> => {
        return from(AsyncStorage.getItem(ApplicationConstants.ACCESS_TOKEN)).pipe(
            mergeMap((token) => {
                if (!token) {
                    return throwError(() => new Error('No token found'));
                }
                try {
                    const decodedToken = jwtDecode<TokenPayload>(token);
                    return of(decodedToken);
                } catch (error) {
                    return throwError(() => new Error('Failed to decode token'));
                }
            })
        );
    },
    logout: (): Observable<void> => {
        return from(removeAccessTokenFn()).pipe(
            tap((): void => {
                console.log('Access token removed successfully');
            })
        );
    }
};