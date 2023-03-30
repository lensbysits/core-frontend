import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export abstract class HttpErrorHandlerService {
	abstract OnNotFound(error: HttpErrorResponse): void;
	abstract OnError(error: HttpErrorResponse): void;

}
