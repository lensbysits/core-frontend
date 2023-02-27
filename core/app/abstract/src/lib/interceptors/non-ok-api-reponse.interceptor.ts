import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { catchError, Observable, throwError } from "rxjs";
import { IErrorMessage } from "../models";
import { ToastService } from "../services";

@Injectable()
export class NonOkApiResonseInterceptor implements HttpInterceptor {
	constructor(protected readonly toastService: ToastService, protected readonly translateService: TranslateService) {}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.error instanceof Blob) {
					error.error.text().then(response => {
						const error : IErrorMessage = JSON.parse(response);
						
						this.toastService.error(
							this.translateService.instant("errorHandling.title"),
							this.translateService.instant("errorHandling.unexpected", { details: error.message ?? "" }),
							"non-ok-api-response-toast",
							30000
						);
					});
				}

				return throwError(() => error);
			})
		);
	}
}
