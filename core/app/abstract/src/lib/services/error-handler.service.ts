import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class ErrorHandlerService implements ErrorHandler {
	private onError = new Subject<unknown>();
	public OnError = this.onError.asObservable();

	constructor(private readonly zone: NgZone) {}

	handleError(error: unknown): void {
		this.zone.run(() => {
			this.onError.next(error);
		});
	}
}
