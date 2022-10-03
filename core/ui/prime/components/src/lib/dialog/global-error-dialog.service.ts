import { Injectable } from "@angular/core";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { LensDialogService } from "./dialog.service";
import { GlobalErrorDialogComponent } from "./global-error-dialog.component";

@Injectable()
export class GlobalErrorDialogService {
    constructor(
        private readonly dialogService: LensDialogService
    ) { }

    public open() : DynamicDialogRef {
        return this.dialogService.open(GlobalErrorDialogComponent);
    }
}