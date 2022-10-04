import { Inject, Injectable, Injector, Type } from "@angular/core";
import { DialogConfig, DialogRef, DialogService } from "@lens/app-core";
import { DialogService as PrimeNgDialogService } from "primeng/dynamicdialog";
import { DialogComponent } from "./dialog.component";

@Injectable()
export class LensDialogService implements DialogService {
    constructor(
        @Inject(Injector) private readonly injector: Injector
    ) { }

    private get dialogService() {
        return this.injector.get(PrimeNgDialogService);
    }

    public open(componentType: Type<any>, config: DialogConfig | undefined = undefined): DialogRef {
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