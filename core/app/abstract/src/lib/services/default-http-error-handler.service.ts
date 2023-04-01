import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpErrorHandlerService } from "./http-error-handler.service";

@Injectable({
	providedIn: "root"
})
export class DefaultHttpErrorHandlerService implements HttpErrorHandlerService {

	OnNotFound(error: HttpErrorResponse): void {
    console.log('not found: ', error);
  }

	OnError(error: HttpErrorResponse): void {
    console.log('http error: ', error);
  }
}
