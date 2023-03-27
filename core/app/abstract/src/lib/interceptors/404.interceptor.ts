import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { HttpErrorHandlerService } from "../services/http-error-handler.service";

@Injectable()
export class NotFoundInterceptor implements HttpInterceptor {
    constructor (private readonly httpErrorHandlerService: HttpErrorHandlerService) { }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if(error.status === 404) {
                      this.httpErrorHandlerService.OnNotFound(error);
                    }

                    return throwError(() => error);
                })
            );
    }
}
