/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IErrorMessage {
    value?: any | undefined;
    message?: string | undefined;
    errorType?: string | undefined;
    errorCode?: string | undefined;
    errorDetails?: string | undefined;
    correlationId?: string | undefined;
    data?: { [key: string]: any; } | undefined;
}