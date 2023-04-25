import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { IMasterdataTranslationFlat } from "../../../core/interfaces";
import { LanguageItem } from "../../../core/models";

@Component({
	selector: "masterdata-translation-list",
	templateUrl: "./translation-list.component.html",
	styleUrls: ["./translation-list.component.scss"]
})
export class MasterdataTranslationListComponent {
	isLoading = false;
	lang = ""; // interface current language; used as an workaround to refresh the lens-table html template view!

	@Input() public viewOnly = false;
	@Input() public translationFlat: IMasterdataTranslationFlat[] = [];
	@Input() public translatableFields: string[] = [];

	@Output() public setDefaultLanguage: EventEmitter<IMasterdataTranslationFlat> = new EventEmitter();

	constructor(private readonly translateService: TranslateService) {
		this.translateService.onLangChange.subscribe(() => {
			this.lang = this.translateService.store.currentLang;
		});
	}

	getTranslationItems() {
		return this.translationFlat;
	}

	onEditActionClicked(item: IMasterdataTranslationFlat) {
		console.log("TODO/onEditActionClicked");
	}

	onSetDefaultActionClicked(item: IMasterdataTranslationFlat) {
		this.setDefaultLanguage.emit(item);
	}
}
