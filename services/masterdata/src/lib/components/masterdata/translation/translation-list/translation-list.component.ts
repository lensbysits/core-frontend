import { Component } from "@angular/core";

@Component({
	selector: "masterdata-translation-list",
	templateUrl: "./translation-list.component.html",
	styleUrls: ["./translation-list.component.scss"]
})
export class MasterdataTranslationListComponent {
	isLoading = false;

	constructor() {
		this.isLoading = true;
	}
}
