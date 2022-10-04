import { Component, Input } from "@angular/core";

@Component({
    templateUrl: "error-dialog.component.html"
})
export class ErrorDialogComponent {
    @Input() public correlationId?: string;
}