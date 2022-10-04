import { Inject, Injectable, Type } from "@angular/core";
import { DialogConfig, DialogRef, DialogService } from "@lens/app-core";
import { IErrorDialogConfiguration } from "./error-dialog-configuration.interface";
import { ERROR_DIALOG_CONFIGURATION } from "./error-dialog.module";

@Injectable()
export class ErrorDialogService {
    constructor(
        private readonly dialogService: DialogService,
        @Inject(ERROR_DIALOG_CONFIGURATION) private readonly configuration: IErrorDialogConfiguration
    ) { }

    public open(config: DialogConfig | undefined = undefined, component: Type<any> | undefined = undefined) : DialogRef {
        let defaultConfig: any = {
            header: "An error has occurred"
        };

        if (config) {
            defaultConfig = Object.assign(defaultConfig, config);
        }

        if (!component) {
            component = this.configuration.errorDialogComponent;
        }

        return this.dialogService.open(component!, defaultConfig);
    }
}