import { Type } from "@angular/core";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { DialogConfig } from "./dialog-config.class";
import { DialogRef } from "./dialog-ref.class";

export abstract class DialogService {
    public open(componentType: Type<any>, config: DialogConfig | undefined = undefined): DialogRef {
        return new DialogRef(new DynamicDialogRef);
    }
}