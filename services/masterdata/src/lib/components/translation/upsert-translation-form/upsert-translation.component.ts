import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LanguageService } from "@lens/app-abstract";
import { DialogComponent, DialogConfig, DialogRef } from "@lens/app-abstract-ui";
import { LanguageExistsValidator } from "../../../core/features";
import { IMasterdataTranslationFlat } from "../../../core/interfaces";
import { LanguageItem } from "../../../core/models";
import { MasterdataRendererService } from "../../../core/services";
import { MasterdataMaxLength, getFieldValue, getRequiredFieldValue } from "../../../core/utils";

@Component({
	templateUrl: "./upsert-translation.component.html",
	styleUrls: ["./upsert-translation.component.scss"]
})
export class MasterdataTranslationUpsertComponent extends DialogComponent implements OnInit {
	isLoading = false;
	saveFormButtonText!: string;
	dataForm!: FormGroup;
	isFormSubmitted = false;
	maxLength = MasterdataMaxLength;
	item!: IMasterdataTranslationFlat;
	isTypeModel!: boolean;
	isAddForm!: boolean;
	translatableFields: string[] = [];
	currentLanguages: string[] = [];
	languagesList: LanguageItem[] = [];
	availableLanguages: LanguageItem[] = [];

	constructor(
		private readonly masterdataRenderer: MasterdataRendererService,
		private readonly languageExistsValidator: LanguageExistsValidator,
		private readonly languageService: LanguageService,
		private readonly formBuilder: FormBuilder,
		@Inject("LensDialogRef") private readonly ref: DialogRef,
		@Inject("LensDialogConfig") public readonly config: DialogConfig
	) {
		super();
		this.initConfigData(this.config.data);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	initConfigData(data: any) {
		const { item, isTypeModel, isAddForm, translatableFields, currentLanguages, languagesList } = data;
		this.item = item;
		this.isTypeModel = isTypeModel;
		this.isAddForm = isAddForm;
		this.translatableFields = translatableFields;
		this.currentLanguages = currentLanguages;
		this.languagesList = languagesList;
	}

	ngOnInit(): void {
		this.availableLanguages = this.languagesList.filter(item => !this.currentLanguages.includes(item.code));

		const whenMdItem = !this.isTypeModel && {
			value: ["", [Validators.required, Validators.maxLength(this.maxLength.value)]]
		};
		const whenAddForm = this.isAddForm && {
			language: ["", [Validators.required, this.languageExistsValidator.checkIfLanguageExists(this.currentLanguages)]]
		};
		this.dataForm = this.formBuilder.group({
			...whenAddForm,
			isDefault: [false, [Validators.required]],
			...whenMdItem,
			name: ["", [Validators.required, Validators.maxLength(this.maxLength.name)]],
			description: ["", [Validators.maxLength(this.maxLength.description)]]
		});

		if (!this.isAddForm) {
			this.populateFormValues(this.item);
		}

		this.buildTranslationTexts();
	}

	// convenience getter for easy access to form fields
	get getFormFields() {
		return this.dataForm.controls;
	}

	onCancelButtonClicked() {
		this.ref.close();
	}

	onSaveButtonClicked() {
		this.isFormSubmitted = true;
		if (this.dataForm.invalid) {
			// stop here if form is invalid
			return;
		}

		this.isLoading = true;

		const isDefault = getFieldValue<boolean>(this.dataForm, "isDefault");
		const language = this.isAddForm ? getRequiredFieldValue<string>(this.dataForm, "language") : this.item.language;
		const name = getRequiredFieldValue<string>(this.dataForm, "name");
		const description = getFieldValue<string>(this.dataForm, "description");

		const model = {} as IMasterdataTranslationFlat;
		model.isDefault = isDefault;
		model.isDefaultForDisplay = this.masterdataRenderer.isDefaultForDisplay(isDefault);
		model.language = language;
		model.languageName = this.languagesList.find(item => item.code === language)?.name ?? "";
		if (!this.isTypeModel) {
			const value = getRequiredFieldValue<string>(this.dataForm, "value");
			model["Value"] = value;
		}
		model["Name"] = name;
		model["Description"] = description;
		//console.log("saveLanguage/model", model);

		this.ref.close(model);
	}

	private populateFormValues(data?: IMasterdataTranslationFlat) {
		this.dataForm.patchValue({
			language: data?.["language"] ?? "",
			isDefault: data?.["isDefault"] ?? false,
			value: data?.["value"] ?? "",
			name: data?.["name"] ?? "",
			description: data?.["description"] ?? ""
		});
	}

	private buildTranslationTexts() {
		this.languageService.onTranslationsLoaded(() => {
			const mode = this.isAddForm ? "add" : "edit";
			this.saveFormButtonText = `masterdatamgmt.pages.masterdataTranslationsBox.upsert.${mode}Form.btnSubmit`;
		});
	}
}
