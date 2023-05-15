import { Component, Input, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { ToastService } from "@lens/app-abstract";
import { DialogService } from "@lens/app-abstract-ui";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import { IMasterdataTranslation, IMasterdataTranslationFlat, IMasterdataTranslationUpdate } from "../../core/interfaces";
import { LanguageItem, Masterdata, MasterdataTranslationDialogData, MasterdataType } from "../../core/models";
import { MasterdataCrudHttpService, MasterdataRendererService } from "../../core/services";
import { MasterdataTranslationUpsertComponent } from "./upsert-translation-form/upsert-translation.component";

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
	@Input() public translation: IMasterdataTranslation[] = [];

	constructor(
		private readonly dialogService: DialogService,
		private readonly masterdataRenderer: MasterdataRendererService,
		private readonly toastService: ToastService,
		private readonly translateService: TranslateService,
		private readonly service: MasterdataCrudHttpService
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

		const model = {} as IMasterdataTranslationUpdate;
		model.translations = this.mapFlatModel2Translation(this.translationFlat);

		if (this.isTypeModel()) {
			this.service.updateMasterdataTypeTranslation(this.typeId, model).subscribe({
				next: data => {
					this.saveChangesComplete(data, true);
				},
				complete: () => (this.isLoading = false),
				error: () => (this.isLoading = false)
			});
		} else {
			this.service.updateMasterdataTranslation(this.typeId, this.masterdataId, model).subscribe({
				next: data => {
					this.saveChangesComplete(data, false);
				},
				complete: () => (this.isLoading = false),
				error: () => (this.isLoading = false)
			});
		}
	}

	async onAddNewLanguage(): Promise<void> {
		const translateKey = "addForm";
		const headerText = this.translateService.instant(`masterdatamgmt.pages.masterdataTranslationsBox.upsert.${translateKey}.header`);
		const dialogRef = this.dialogService.open(MasterdataTranslationUpsertComponent, {
			header: headerText,
			width: "50%",
			data: new MasterdataTranslationDialogData(
				null,
				this.isTypeModel(),
				true,
				this.translatableFields,
				this.translationFlat.map(item => item.language),
				this.languagesList
			)
		});

		dialogRef.onClose.subscribe((model: IMasterdataTranslationFlat) => {
			if (!model) {
				return;
			}

			// add new language if not exists already
			if (!this.translationFlat.find(item => item.language === model.language)) {
				this.translationFlat.push({
					...model
				});
				if (model.isDefault) {
					// set this language as default one
					this.setDefaultLanguage(model.language, true);
				}
				this.isDirtyChanges = true;
			}
		});
	}

	async onEditLanguage(item: IMasterdataTranslationFlat): Promise<void> {
		const translateKey = "editForm";
		const headerText = this.translateService.instant(`masterdatamgmt.pages.masterdataTranslationsBox.upsert.${translateKey}.header`);
		const dialogRef = this.dialogService.open(MasterdataTranslationUpsertComponent, {
			header: headerText,
			width: "50%",
			data: new MasterdataTranslationDialogData(
				item,
				this.isTypeModel(),
				false,
				this.translatableFields,
				this.translationFlat.map(item => item.language),
				this.languagesList
			)
		});

		dialogRef.onClose.subscribe((model: IMasterdataTranslationFlat) => {
			if (!model) {
				return;
			}

			const foundIndex = this.translationFlat.findIndex(item => item.language === model.language); // find current edited language
			if (foundIndex !== -1) {
				const origDefaultState = this.translationFlat[foundIndex].isDefault;
				this.translationFlat[foundIndex] = {
					// update language
					...this.translationFlat[foundIndex],
					...model
				};
				if (model.isDefault) {
					// set this language as default one
					this.setDefaultLanguage(model.language, true);
				} else if (!model.isDefault && origDefaultState) {
					// fallback: if this edited language was the current default one, than set first found language as default one
					this.setDefaultLanguage(this.translationFlat.find(item => item !== undefined)?.language ?? "", true);
				}
				this.isDirtyChanges = true;
			}
		});
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

	private setDefaultLanguage(language: string, forceReset = false) {
		if (!forceReset) {
			const isCurrentDefault = this.translationFlat.find(item => language === item.language)?.isDefault;
			if (isCurrentDefault) {
				// already is set as default language
				return;
			}
		}

		this.translationFlat = this.translationFlat.map(item => {
			const isDefault = language === item.language;
			return {
				...item,
				isDefault: isDefault,
				isDefaultForDisplay: this.masterdataRenderer.isDefaultForDisplay(isDefault)
			};
		});
		this.isDirtyChanges = true;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private reloadTranslation(translation: IMasterdataTranslation[]) {
		this.translation = translation;
		this.initTranslation();
	}

	private initTranslation() {
		this.translationFlat = this.mapTranslation2FlatModel(this.translation);
		this.translationFlat = this.addLanguageNameToTranslation(this.translationFlat);
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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private mapFlatModel2Translation(items: IMasterdataTranslationFlat[]): IMasterdataTranslation[] {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const res: IMasterdataTranslation[] = [];
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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private mapTranslation2FlatModel(items: IMasterdataTranslation[]): IMasterdataTranslationFlat[] {
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
							isDefaultForDisplay: this.masterdataRenderer.isDefaultForDisplay(item.isDefault)
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
