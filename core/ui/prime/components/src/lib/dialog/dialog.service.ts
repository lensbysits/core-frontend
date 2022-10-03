import { Injectable, Type } from "@angular/core";
import { DynamicDialogRef, DialogService as PrimeNgDialogService } from "primeng/dynamicdialog";
import { DialogComponent } from "./dialog.component";

@Injectable()
export class LensDialogService {
    constructor(
        private readonly dialogService: PrimeNgDialogService
    ) { }

    public open(componentType: Type<any>): DynamicDialogRef {
        return this.dialogService.open(DialogComponent, { header: "An error has occurred", width: "25%", styleClass: "dynamicDialog", data: { componentType: componentType } })
    }
}