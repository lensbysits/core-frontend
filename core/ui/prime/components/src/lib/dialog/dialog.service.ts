import { Inject, Injectable, Injector, Type } from "@angular/core";
import { DynamicDialogRef, DialogService as PrimeNgDialogService } from "primeng/dynamicdialog";
import { DialogConfig } from "./dialog-config.class";
import { DialogRef } from "./dialog-ref.class";
import { DialogComponent } from "./dialog.component";

@Injectable()
export class LensDialogService {
    constructor(
        //private readonly dialogService: PrimeNgDialogService
        @Inject(Injector) private readonly injector: Injector
    ) { }

    private get dialogService() {
        return this.injector.get(PrimeNgDialogService);
    }

    public open(config: DialogConfig | undefined = undefined, componentType: Type<any>): DialogRef {
        let defaultConfig: any = {
            width: "25%",
            styleClass: "dynamicDialog",
            data: {}
        };

        if (config) {
            defaultConfig = Object.assign(defaultConfig, config);
        }

        defaultConfig.data.componentType = componentType;

        const result = this.dialogService.open(DialogComponent, defaultConfig)

        return new DialogRef(result);
    }
}