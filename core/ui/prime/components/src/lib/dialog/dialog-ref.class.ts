import { DynamicDialogRef } from "primeng/dynamicdialog";
import { Observable } from "rxjs";

export class DialogRef {
    public onClose = this.dynamicDialogRef.onClose;
    public onDestroy = this.dynamicDialogRef.onDestroy;

    constructor(
        private readonly dynamicDialogRef: DynamicDialogRef
    ) { }

    public close(result?: any): void {
        this.dynamicDialogRef.close(result);
    }

    public destroy(): void {
        this.dynamicDialogRef.destroy();
    }
}