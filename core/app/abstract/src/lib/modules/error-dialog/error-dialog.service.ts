import { Injectable, Type } from "@angular/core";
import { DialogConfig, DialogRef, DialogService } from "@lens/app-core";
import { GlobalErrorDialogComponent } from "./error-dialog.component";

@Injectable()
export class ErrorDialogService {
    constructor(
        private readonly dialogService: DialogService
    ) { }

    public open(config: DialogConfig | undefined = undefined, component: Type<any> = GlobalErrorDialogComponent) : DialogRef {
        let defaultConfig: any = {
            header: "An error has occurred"
        };

        if (config) {
            defaultConfig = Object.assign(defaultConfig, config);
        }

        return this.dialogService.open(component, defaultConfig);
    }
}