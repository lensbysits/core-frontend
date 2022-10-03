import { Component, Type, ViewChild, ViewContainerRef } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
    templateUrl: "dialog.component.html",
    styleUrls: [ "dialog.component.scss" ]
})
export class DialogComponent {
    @ViewChild("dialogContentContainer", { read: ViewContainerRef }) private dialogContentContainer!: ViewContainerRef;

    constructor(
        private readonly ref: DynamicDialogRef,
        private readonly config: DynamicDialogConfig,
    ) {
        this.createDialogContentContainerComponent(config.data.componentType);
    }

    private createDialogContentContainerComponent(componentType: Type<any>) {
        this.dialogContentContainer.clear();
        this.dialogContentContainer.createComponent(componentType);
    }

    public onCloseClick() {
        this.ref.close();
    }
}