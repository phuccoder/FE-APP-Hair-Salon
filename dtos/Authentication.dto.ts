export interface SuccessResponse<T> {
    code: number;
    message: string;
    timestamp: number;
    data: T
}

export interface SignUpRequest {
    accountName: string;
    accountEmail: string;
    accountPhone: string;
    password: string;
    confirmPassword: string;
}

export interface SignInRequest {
    emailOrPhone: string;
    password: string;
}

export interface SignInResponse  {
    accessToken: string;
    refreshToken: string;
    accountID: number;
    accountName: string;
    role: string;
}
