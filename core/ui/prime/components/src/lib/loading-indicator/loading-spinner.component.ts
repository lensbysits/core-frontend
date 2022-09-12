import { Component, Input } from "@angular/core";

@Component({
    selector: "lens-loading-spinner",
    templateUrl: "./loading-spinner.component.html"
})
export class LoadingSpinnerComponent {
    @Input()
    public isLoading = false;
}