import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class NotFoundInterceptor implements HttpInterceptor {
    constructor (private readonly router: Router) { }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if(error.status === 404) {
                        this.router.navigateByUrl("/not-found");
                        throw "Record not found";
                    }
                    return throwError(() => error);
                })
            );
    }
}