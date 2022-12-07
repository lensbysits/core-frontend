import { Component } from "@angular/core";
import { DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  templateUrl: "error-details.component.html",
})
export class ErrorDetailsComponent {
  constructor(public readonly config: DynamicDialogConfig) {}
}
