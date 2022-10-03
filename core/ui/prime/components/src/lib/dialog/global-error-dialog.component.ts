import { Component, Input } from "@angular/core";

@Component({
    templateUrl: "global-error-dialog.component.html"
})
export class GlobalErrorDialogComponent {
    @Input() public correlationId = "1233";
}