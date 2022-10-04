import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { ErrorDialogService } from "../error-dialog";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        private readonly zone: NgZone,
        private readonly dialogService: ErrorDialogService
    ) { }

    handleError(error: any): void {
        this.zone.run(() => {
            console.error(error);
            this.dialogService.open();
        })
    }
}