/* eslint-disable no-console */
import { Injectable, Type } from "@angular/core";
import { DialogConfig } from "./dialog-config.class";
import { DialogRef } from "./dialog-ref.class";

export abstract class DialogService {
    public abstract open(componentType: Type<any>, config: DialogConfig | undefined): DialogRef;
}

@Injectable()
export class DefaultDialogService extends DialogService {
    public open(componentType: Type<any>, config: DialogConfig | undefined): DialogRef {
        console.log('should show dialog with compoment: ', componentType.name);
        console.log('using dialogConfig: ', config);
        console.log("Method not implemented. Please register a DialogService implementation\n('providers: [ { provide: DialogService, useClass: YourLayoutLibDialogServiceImplementation }]')");
        return <DialogRef>{};
    }
}