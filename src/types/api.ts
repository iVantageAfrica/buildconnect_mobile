
export interface APISuccessResponse<T> {
    code: string;
    data: T;
    message: string;
    reqId: string;
    statusCode: number;
    success: true;
}

export interface ApiErrorResponse {
    code: string;
    message: string;
    reqId: string;
    statusCode: number;
    success: false;
}

export type ApiResponse<T> = APISuccessResponse<T> | ApiErrorResponse;
