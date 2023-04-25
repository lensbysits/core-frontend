import { Component, Input, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { ToastService } from "@lens/app-abstract";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import {
	IMasterdataTranslation,
	IMasterdataTranslationFlat,
	IMasterdataTranslationUpdateMdItem,
	IMasterdataTranslationUpdateMdType
} from "../../core/interfaces";
import { LanguageItem, Masterdata, MasterdataType } from "../../core/models";
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
	isDirtyChanges = false;

	@Input() public showHeader = true;
	@Input() public viewOnly = false;
	@Input() public typeId = "";
	@Input() public masterdataId = "";
	@Input() public translation: IMasterdataTranslation<any>[] = [];

	constructor(
		private readonly toastService: ToastService,
		private readonly translateService: TranslateService,
		private readonly service: MasterdataCrudHttpService,
		public readonly translationService: MasterdataTranslationService
	) {}

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

	isTypeModel(): boolean {
		return !(this.masterdataId !== "");
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

	onSetDefaultLanguage(item: IMasterdataTranslationFlat) {
		const { language } = item;
		this.setDefaultLanguage(language);
	}

	onSaveChanges() {
		this.isLoading = true;

		if (this.isTypeModel()) {
			const model = {} as IMasterdataTranslationUpdateMdType;
			model.translations = this.mapFlatModel2Translation(this.translationFlat);
			console.log("SaveChange/model/type", model);

			this.service.updateMasterdataTypeTranslation(this.typeId, model).subscribe({
				next: data => {
					this.saveChangesComplete(data, true);
				},
				complete: () => (this.isLoading = false),
				error: () => (this.isLoading = false)
			});
		} else {
			const model = {} as IMasterdataTranslationUpdateMdItem;
			model.translations = this.mapFlatModel2Translation(this.translationFlat);
			console.log("SaveChange/model/masterdata", model);

			this.service.updateMasterdataTranslation(this.typeId, this.masterdataId, model).subscribe({
				next: data => {
					this.saveChangesComplete(data, false);
				},
				complete: () => (this.isLoading = false),
				error: () => (this.isLoading = false)
			});
		}
	}

	private saveChangesComplete(data: Masterdata | MasterdataType, isType: boolean) {
		const translateKey = isType ? "successMdType" : "successMdItem";

		this.isLoading = false;
		this.isDirtyChanges = false;
		this.reloadTranslation(data.translation ?? []);

		this.toastService.success(
			this.translateService.instant(`masterdatamgmt.pages.masterdataTranslationsBox.notifications.saveChanges.${translateKey}.title`),
			this.translateService.instant(`masterdatamgmt.pages.masterdataTranslationsBox.notifications.saveChanges.${translateKey}.message`)
		);
	}

	private setDefaultLanguage(language: string) {
		const isCurrentDefault = this.translationFlat.find(item => language === item.language)?.isDefault;
		if (isCurrentDefault) {
			// already is set as default language
			return;
		}

		this.translationFlat = this.translationFlat.map(item => {
			const isDefault = language === item.language;
			return {
				...item,
				isDefault: isDefault,
				isDefaultForDisplay: isDefault ? "yes" : "no"
			};
		});
		this.isDirtyChanges = true;
	}

	private reloadTranslation(translation: IMasterdataTranslation<any>[]) {
		this.translation = translation;
		this.initTranslation();
	}

	private initTranslation() {
		this.translationFlat = this.mapTranslation2FlatModel(this.translation);
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

	private mapFlatModel2Translation(items: IMasterdataTranslationFlat[]): IMasterdataTranslation<any>[] {
		const res: IMasterdataTranslation<any>[] = [];
		items
			.filter(item => item.language !== "")
			.forEach(item => {
				let langFoundIndex = res.findIndex(elem => elem.language === item.language);
				if (langFoundIndex === -1) {
					res.push({
						language: item.language,
						isDefault: item.isDefault,
						values: []
					});
					langFoundIndex = res.length - 1;
				}

				Object.keys(item).forEach(itemKey => {
					if (this.translatableFields.includes(itemKey)) {
						res[langFoundIndex].values.push({
							field: itemKey,
							value: String(item[itemKey])
						});
					}
				});
			});
		return res;
	}

	private mapTranslation2FlatModel(items: IMasterdataTranslation<any>[]): IMasterdataTranslationFlat[] {
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
