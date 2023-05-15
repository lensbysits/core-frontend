import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { KeyValuePair, LanguageService, ToastService } from "@lens/app-abstract";
import { JsonEditorComponent, JsonEditorOptions } from "@maaxgr/ang-jsoneditor";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { IMasterdataCreate, IMasterdataUpdate } from "../../../core/interfaces";
import { Masterdata, MasterdataType } from "../../../core/models";
import { MasterdataCrudHttpService, MasterdataRendererService } from "../../../core/services";
import { MasterdataMaxLength, getFieldValue, getRequiredFieldValue } from "../../../core/utils";

@Component({
	selector: "masterdata-edit-form",
	templateUrl: "./masterdata-edit-form.component.html",
	styleUrls: ["./masterdata-edit-form.component.scss"]
})
export class MasterdatasEditFormComponent implements OnInit {
	isLoading = false;
	id!: string;
	typeId = "";
	masterdataType$?: Observable<MasterdataType>;
	dataForm!: FormGroup;
	isFormSubmitted = false;
	isAddForm = true;
	needsTypeIdSelector = false;
	item?: Masterdata;
	maxLength = MasterdataMaxLength;
	typesList: MasterdataType[] = [];
	tagsList: string[] = [];
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
		this.id = this.activeRoute.snapshot.params["masterdata"];
		this.typeId = this.activeRoute.snapshot.params["masterdatatype"];
		this.isAddForm = !(this.id !== undefined);
		this.needsTypeIdSelector = !(this.typeId !== undefined);

		if (this.typeId) {
			this.masterdataType$ = this.service.getMasterdataTypeById(this.typeId);
		}
		this.loadTagsList();

		if (!this.isAddForm) {
			this.loadData();
		}
		if (this.isAddForm && this.needsTypeIdSelector) {
			this.loadTypesList();
		}

		const whenAddForm = this.isAddForm && {
			masterdataTypeId: [this.typeId ?? "", [Validators.required]],
			key: ["", [Validators.required, Validators.maxLength(this.maxLength.key)]]
		};
		this.dataForm = this.formBuilder.group({
			...whenAddForm,
			value: ["", [Validators.required, Validators.maxLength(this.maxLength.value)]],
			name: ["", [Validators.required, Validators.maxLength(this.maxLength.name)]],
			description: ["", [Validators.maxLength(this.maxLength.description)]],
			metadata: ["", [Validators.maxLength(this.maxLength.metadata)]],
			tags: [[] as KeyValuePair<string, string>[]]
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
		this.service.getMasterdataById(this.typeId, this.id).subscribe({
			next: data => {
				if (!data) {
					this.router.navigateByUrl("/not-found");
					return;
				}

				this.dataForm.patchValue({
					value: data.value,
					name: data.name,
					description: data.description,
					metadata: data.metadata,
					tags: data.tags?.map(item => new KeyValuePair<string, string>(item, item))
				});
				this.item = data || {};
				this.isLoading = false;
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	onSubmit() {
		this.isFormSubmitted = true;
		if (this.dataForm.invalid) {
			return;
		}

		this.isLoading = true;

		const value = getRequiredFieldValue<string>(this.dataForm, "value");
		const name = getRequiredFieldValue<string>(this.dataForm, "name");
		const description = getFieldValue<string>(this.dataForm, "description");
		const metadata = getFieldValue<string>(this.dataForm, "metadata");
		const tags = getFieldValue<KeyValuePair<string, string>[]>(this.dataForm, "tags").map(item => item.key);

		if (this.isAddForm) {
			const key = getRequiredFieldValue<string>(this.dataForm, "key");
			const masterdataTypeId = getRequiredFieldValue<string>(this.dataForm, "masterdataTypeId");

			const model = {} as IMasterdataCreate;
			model.key = key;
			model.masterdataTypeId = masterdataTypeId;
			model.value = value;
			model.name = name;
			model.description = description;
			model.metadata = metadata;
			model.tags = tags;

			this.service.createMasterdata(model).subscribe({
				next: () => {
					this.navigateToListView();
					this.isLoading = false;
					this.toastService.success(
						this.translateService.instant("masterdatamgmt.pages.masterdataUpsert.notifications.successAdd.title"),
						this.translateService.instant("masterdatamgmt.pages.masterdataUpsert.notifications.successAdd.message")
					);
				},
				complete: () => (this.isLoading = false),
				error: () => (this.isLoading = false)
			});
		} else {
			const model = {} as IMasterdataUpdate;
			model.value = value;
			model.name = name;
			model.description = description;
			model.metadata = metadata;
			model.tags = tags;

			this.service.updateMasterdata(this.typeId, this.id, model).subscribe({
				next: () => {
					this.navigateToListView();
					this.isLoading = false;
					this.toastService.success(
						this.translateService.instant("masterdatamgmt.pages.masterdataUpsert.notifications.successEdit.title"),
						this.translateService.instant("masterdatamgmt.pages.masterdataUpsert.notifications.successEdit.message")
					);
				},
				complete: () => (this.isLoading = false),
				error: () => (this.isLoading = false)
			});
		}
	}

	btnCancel() {
		this.navigateToListView();
	}

	navigateToListView() {
		this.router.navigate([".."], { relativeTo: this.activeRoute });
	}

	loadTypesList() {
		this.isLoading = true;
		this.service.getAllMasterdataTypes(0, 0).subscribe({
			next: data => {
				this.typesList = data.value || [];
				this.isLoading = false;
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	loadTagsList() {
		this.isLoading = true;
		this.service.getAllTags(this.typeId, 0, 0).subscribe({
			next: data => {
				this.tagsList = data.value || [];
				this.isLoading = false;
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	private buildTranslationTexts() {
		this.languageService.onTranslationsLoaded(() => {
			const mode = this.isAddForm ? "add" : "edit";
			this.formHeaderText = `masterdatamgmt.pages.masterdataUpsert.${mode}FormTitle`;
			this.saveFormButtonText = `masterdatamgmt.pages.masterdataUpsert.buttons.btnSubmit${this.masterdataRenderer.titleCase(mode)}Form`;
		});
	}
}
