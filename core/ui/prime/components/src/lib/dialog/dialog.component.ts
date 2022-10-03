import { Component } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
    templateUrl: "dialog.component.html",
    styleUrls: [ "dialog.component.scss" ]
})
export class DialogComponent {

    constructor(
        private readonly ref: DynamicDialogRef,
        public readonly config: DynamicDialogConfig,
    ) { }

    public onCloseClick() {
        this.ref.close();
    }
}