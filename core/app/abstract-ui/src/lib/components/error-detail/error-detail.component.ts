import { Component } from "@angular/core";
import { DialogComponent } from "../../services";

@Component({
	selector: "lens-error-detail",
	template: `
		<ng-template #body><p>An unexpected error occurred.</p></ng-template>
	`,
	styles: [],
})
export class ErrorDetailComponent extends DialogComponent {}
