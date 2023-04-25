import { Component, Input, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { IMasterdataTranslation, IMasterdataTranslationFlat } from "../../core/interfaces";
import { LanguageItem } from "../../core/models";
import { MasterdataCrudHttpService, MasterdataTranslationService } from "../../core/services";

@Component({
	selector: "masterdata-translation",
	templateUrl: "./translation.component.html",
	styleUrls: ["./translation.component.scss"]
})
export class MasterdataTranslationComponent implements OnInit, OnDestroy, OnChanges {
	private destroy$ = new Subject<void>();

	isLoading = false;
	languagesList: LanguageItem[] = [];
	translationFlat: IMasterdataTranslationFlat[] = [];
	translatableFields: string[] = [];

	@Input() public showHeader = true;
	@Input() public viewOnly = false;
	@Input() public typeId = "";
	@Input() public masterdataId = "";
	@Input() public translation: IMasterdataTranslation<any>[] = [];

	constructor(private readonly service: MasterdataCrudHttpService, public readonly translationService: MasterdataTranslationService) {}

	ngOnInit(): void {
		this.initTranslation();
		this.loadLanguagesList();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	ngOnChanges() {
		this.initTranslation();
	}

	loadLanguagesList() {
		this.isLoading = true;
		this.service.getAllLanguages(this.typeId, 0, 0).subscribe({
			next: data => {
				this.languagesList = data.value || [];
				this.initTranslation();
				this.isLoading = false;
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	private initTranslation() {
		this.translationFlat = this.mapTranslation2Flat(this.translation);
		this.translationFlat = this.addLanguageNameToTranslation(this.translationFlat);
		//this.translationService.resetTranslationItems(this.translationFlat);
		console.log("translation", this.translation);
		console.log("translationFlat", this.translationFlat);
	}

	private addLanguageNameToTranslation(items: IMasterdataTranslationFlat[]): IMasterdataTranslationFlat[] {
		return items.map(item => {
			const languageName = this.languagesList.find(lang => lang.code === item.language)?.name ?? "";
			return {
				...item,
				languageName
			};
		});
	}

	private mapTranslation2Flat(items: IMasterdataTranslation<any>[]): IMasterdataTranslationFlat[] {
		const res: IMasterdataTranslationFlat[] = [];
		items
			.filter(item => item.language !== "")
			.forEach(item => {
				item.values.forEach(value => {
					let langFoundIndex = res.findIndex(elem => elem.language === item.language);
					if (langFoundIndex === -1) {
						res.push({
							language: item.language,
							languageName: "",
							isDefault: item.isDefault,
							isDefaultForDisplay: item.isDefault ? "yes" : "no"
						});
						langFoundIndex = res.length - 1;
					}

					res[langFoundIndex] = {
						...res[langFoundIndex],
						[value.field]: value.value
					};

					if (!this.translatableFields.includes(value.field)) {
						this.translatableFields.push(value.field);
					}
				});
			});
		return res;
	}
}
