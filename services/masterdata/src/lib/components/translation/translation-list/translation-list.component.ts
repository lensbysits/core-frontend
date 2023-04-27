import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { IMasterdataTranslationFlat } from "../../../core/interfaces";

@Component({
	selector: "masterdata-translation-list",
	templateUrl: "./translation-list.component.html",
	styleUrls: ["./translation-list.component.scss"]
})
export class MasterdataTranslationListComponent {
	isLoading = false;

	@Input() public viewOnly = false;
	@Input() public translationFlat: IMasterdataTranslationFlat[] = [];
	@Input() public translatableFields: string[] = [];

	@Output() public setDefaultLanguage: EventEmitter<IMasterdataTranslationFlat> = new EventEmitter();
	@Output() public editLanguage: EventEmitter<IMasterdataTranslationFlat> = new EventEmitter();

	constructor(private readonly translateService: TranslateService) {}

	getTranslationItems() {
		return this.translationFlat;
	}

	onEditActionClicked(item: IMasterdataTranslationFlat) {
		this.editLanguage.emit(item);
	}

	onSetDefaultActionClicked(item: IMasterdataTranslationFlat) {
		this.setDefaultLanguage.emit(item);
	}
}
