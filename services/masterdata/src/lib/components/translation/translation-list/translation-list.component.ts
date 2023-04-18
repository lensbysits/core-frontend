import { Component } from "@angular/core";
import * as data from "../../../../assets/locales/masterdata-translation-mock.json";

@Component({
	selector: "masterdata-translation-list",
	templateUrl: "./translation-list.component.html",
	styleUrls: ["./translation-list.component.scss"]
})
export class MasterdataTranslationListComponent {
	isLoading = false;
	translation: any = (data as any).default;

	constructor() {
		this.isLoading = true;
	}
}
