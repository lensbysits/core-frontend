import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { JsonEditorComponent, JsonEditorOptions } from "@maaxgr/ang-jsoneditor";
import { LanguageService, ToastService } from "@lens/app-abstract";
import { getRequiredFieldValue, getFieldValue, MasterdataTypeMaxLength } from "../../../core/utils";
import { MasterdataType } from "../../../core/models";
import { IMasterdataTypeCreate, IMasterdataTypeUpdate } from "../../../core/interfaces";
import { MasterdataCrudHttpService, MasterdataRendererService } from "../../../core/services";

@Component({
	selector: "masterdata-type-edit-form",
	templateUrl: "./type-edit-form.component.html",
	styleUrls: ["./type-edit-form.component.scss"]
})
export class MasterdataTypeEditFormComponent implements OnInit {
	isLoading = false;
	id!: string;
	dataForm!: FormGroup;
	isFormSubmitted = false;
	isAddForm = true;
	item?: MasterdataType;
	maxLength = MasterdataTypeMaxLength;
	saveFormButtonText!: string;
	formHeaderText!: string;

	@ViewChild(JsonEditorComponent, { static: false }) metadataEditor!: JsonEditorComponent;

	constructor(
		private readonly masterdataRenderer: MasterdataRendererService,
		private readonly service: MasterdataCrudHttpService,
		private readonly router: Router,
		private readonly activeRoute: ActivatedRoute,
		private readonly formBuilder: FormBuilder,
		private readonly toastService: ToastService,
		private readonly translateService: TranslateService,
		private readonly languageService: LanguageService
	) {}

	ngOnInit(): void {
		this.id = this.activeRoute.snapshot.params["masterdatatype"];
		this.isAddForm = !(this.id !== undefined);

		if (!this.isAddForm) {
			this.loadData();
		}

		this.dataForm = this.formBuilder.group({
			code: ["", [Validators.required, Validators.maxLength(this.maxLength.code)]],
			name: ["", [Validators.required, Validators.maxLength(this.maxLength.name)]],
			description: ["", [Validators.maxLength(this.maxLength.description)]],
			metadata: ["", [Validators.maxLength(this.maxLength.metadata)]]
		});

		this.buildTranslationTexts();
	}

	makeMetadataEditorOptions(): JsonEditorOptions {
		const opt = new JsonEditorOptions();
		opt.mode = "tree";
		opt.modes = ["code", "text", "tree", "view"];
		return opt;
	}

	// convenience getter for easy access to form fields
	get getFormFields() {
		return this.dataForm.controls;
	}

	loadData() {
		this.isLoading = true;
		this.service.getMasterdataTypeById(this.id).subscribe({
			next: data => {
				if (!data) {
					this.router.navigateByUrl("/not-found");
					return;
				}

				this.dataForm.patchValue({
					code: data.code,
					name: data.name,
					description: data.description,
					metadata: data.metadata
				});
				this.item = data || {};
				this.isLoading = false;
			},
			complete: () => this.isLoading = false,
			error: () => this.isLoading = false
		});
	}

	onSubmit() {
		this.isFormSubmitted = true;
		if (this.dataForm.invalid) {
			// stop here if form is invalid
			return;
		}

		this.isLoading = true;

		const name = getRequiredFieldValue<string>(this.dataForm, "name");
		const description = getFieldValue<string>(this.dataForm, "description");
		const metadata = getFieldValue<string>(this.dataForm, "metadata");

		if (this.isAddForm) {
			const code = getRequiredFieldValue<string>(this.dataForm, "code");

			const model = {} as IMasterdataTypeCreate;
			model.code = code;
			model.name = name;
			model.description = description;
			model.metadata = metadata;

			this.service.createMasterdataType(model).subscribe({
				next: () => {
					this.navigateToListView();
					this.isLoading = false;
					this.toastService.success(
						this.translateService.instant("masterdatamgmt.pages.masterdataTypeUpsert.notifications.successAdd.title"),
						this.translateService.instant("masterdatamgmt.pages.masterdataTypeUpsert.notifications.successAdd.message")
					);
				},
				complete: () => this.isLoading = false,
				error: () => this.isLoading = false
			});
		} else {
			const model = {} as IMasterdataTypeUpdate;
			model.name = name;
			model.description = description;
			model.metadata = metadata;

			this.service.updateMasterdataType(this.id, model).subscribe({
				next: () => {
					this.navigateToListView();
					this.isLoading = false;
					this.toastService.success(
						this.translateService.instant("masterdatamgmt.pages.masterdataTypeUpsert.notifications.successEdit.title"),
						this.translateService.instant("masterdatamgmt.pages.masterdataTypeUpsert.notifications.successEdit.message")
					);
				},
				complete: () => this.isLoading = false,
				error: () => this.isLoading = false
			});
		}
	}

	btnCancel() {
		this.navigateToListView();
	}

	navigateToListView() {
		this.router.navigate(["/"]);
	}

	private buildTranslationTexts() {
		this.languageService.onTranslationsLoaded(() => {
			const mode = this.isAddForm ? "add" : "edit";
			this.formHeaderText = `masterdatamgmt.pages.masterdataTypeUpsert.${mode}FormTitle`;
			this.saveFormButtonText = `masterdatamgmt.pages.masterdataTypeUpsert.buttons.btnSubmit${this.masterdataRenderer.titleCase(mode)}Form`;
		});
	}
}
