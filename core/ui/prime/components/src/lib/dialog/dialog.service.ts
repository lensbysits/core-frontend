import { Injectable, Type } from "@angular/core";
import { DialogConfig, DialogRef as LensDialogRef, DialogService as LensDialogService } from "@lens/app-abstract-ui";
import { DialogService } from "primeng/dynamicdialog";
import { DialogComponent } from "./dialog.component";

@Injectable({
    providedIn: 'root'
})
export class PrimeDialogService implements LensDialogService {
    constructor(private dialogService: DialogService) {
    }

    public open(componentType: Type<any>, config: DialogConfig | undefined = undefined): LensDialogRef {
        let defaultConfig: any = {
            width: "25%",
            styleClass: "dynamicDialog",
            data: {}
        };

        if (config) {
            defaultConfig = Object.assign(defaultConfig, config);
        }

        defaultConfig.data.componentType = componentType;
        return this.dialogService.open(DialogComponent, defaultConfig);
    }
}