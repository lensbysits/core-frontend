import { Component, Input } from "@angular/core";

@Component({
    templateUrl: "error-dialog.component.html"
})
export class GlobalErrorDialogComponent {
    @Input() public correlationId?: string;
}