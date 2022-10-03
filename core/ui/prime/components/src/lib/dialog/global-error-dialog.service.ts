import { Injectable, Type } from "@angular/core";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { DialogConfig } from "./dialog-config.class";
import { DialogRef } from "./dialog-ref.class";
import { LensDialogService } from "./dialog.service";
import { GlobalErrorDialogComponent } from "./global-error-dialog.component";

@Injectable()
export class GlobalErrorDialogService {
    constructor(
        private readonly dialogService: LensDialogService
    ) { }

    public open(config: DialogConfig | undefined = undefined, component: Type<any> = GlobalErrorDialogComponent) : DialogRef {
        let defaultConfig: any = {
            header: "An error has occurred"
        };

        if (config) {
            defaultConfig = Object.assign(defaultConfig, config);
        }

        return this.dialogService.open(defaultConfig, component);
    }
}