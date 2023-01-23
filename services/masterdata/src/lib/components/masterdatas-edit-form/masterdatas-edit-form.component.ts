import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { JsonEditorComponent, JsonEditorOptions } from "@maaxgr/ang-jsoneditor";
import { ToastService } from "@lens/ui-prime-components";
import { getRequiredFieldValue, getFieldValue, KeyValuePair } from "../../core/utils";
import { Masterdata, MasterdataType } from "../../core/models";
import { IMasterdataCreate, IMasterdataUpdate } from "../../core/interfaces";
import { MasterdataCrudHttpService } from "../../core/services";
import { MasterdataMaxLength } from "../../core/utils";

@Component({
	selector: "lens-masterdatas-edit-form",
	templateUrl: "./masterdatas-edit-form.component.html",
	styleUrls: ["./masterdatas-edit-form.component.scss"]
})
export class MasterdatasEditFormComponent implements OnInit {
	isLoading = false;
	id!: string;
	typeId = "";
	masterdataType$?: Observable<MasterdataType>;
	dataForm!: FormGroup;
	isFormSubmitted = false;
	isAddForm = true;
	saveBtnText = "Save";
	formTitle = "Add";
	needsTypeIdSelector = false;
	item?: Masterdata;
	maxLength = MasterdataMaxLength;
	typesList: MasterdataType[] = [];
  tagsList: string[] = [];

	@ViewChild(JsonEditorComponent, { static: false }) metadataEditor!: JsonEditorComponent;

	constructor(
		private readonly service: MasterdataCrudHttpService,
		private readonly router: Router,
		private readonly activeRoute: ActivatedRoute,
		private readonly formBuilder: FormBuilder,
		private readonly toastService: ToastService
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
			this.saveBtnText = "Update";
			this.formTitle = "Edit";
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
		this.service.getMasterdataById(this.typeId, this.id).subscribe(data => {
      if (!data) {
        this.router.navigateByUrl("/not-found");
        return;
      }

			this.dataForm.patchValue({
				value: data.value,
				name: data.name,
				description: data.description,
				metadata: data.metadata,
        tags: data.tags?.map(item => ({key: item, value: item} as KeyValuePair<string, string>))
			});
			this.item = data || {};
			this.isLoading = false;
		});
	}

	onSubmit() {
		this.isFormSubmitted = true;
		if (this.dataForm.invalid) {
			// stop here if form is invalid
			return;
		}

		//this.isLoading = true;

		const value = getRequiredFieldValue<string>(this.dataForm, "value");
		const name = getRequiredFieldValue<string>(this.dataForm, "name");
		const description = getFieldValue<string>(this.dataForm, "description");
		const metadata = getFieldValue<string>(this.dataForm, "metadata");
    const tags = getFieldValue<KeyValuePair<string, string>[]>(this.dataForm, "tags").map(item => item.key);

		if (this.isAddForm) {
			const key = getRequiredFieldValue<string>(this.dataForm, "key");
			const masterdataTypeIdSelector = getRequiredFieldValue<KeyValuePair<string, string>>(this.dataForm, "masterdataTypeId").key;
			const masterdataTypeId = getRequiredFieldValue<string>(this.dataForm, "masterdataTypeId");

			const model = {} as IMasterdataCreate;
			model.key = key;
			model.masterdataTypeId = masterdataTypeIdSelector ?? masterdataTypeId ?? undefined;
			model.value = value;
			model.name = name;
			model.description = description;
			model.metadata = metadata;
      model.tags = tags;

			this.service.createMasterdata(model).subscribe(() => {
				this.navigateToListView();
				this.isLoading = false;
				this.toastService.success("Add masterdata", "The masterdata was succesfully added.");
			});
		} else {
			const model = {} as IMasterdataUpdate;
			model.value = value;
			model.name = name;
			model.description = description;
			model.metadata = metadata;
      model.tags = tags;

			this.service.updateMasterdata(this.typeId, this.id, model).subscribe(() => {
				this.navigateToListView();
				this.isLoading = false;
				this.toastService.success("Update masterdata", "The masterdata was succesfully updated.");
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
			complete: () => {
				this.isLoading = false;
			}
		});
	}

	loadTagsList() {
		this.isLoading = true;
		this.service.getAllTags(this.typeId, 0, 0).subscribe({
			next: data => {
				this.tagsList = data.value || [];
				this.isLoading = false;
			},
			complete: () => {
				this.isLoading = false;
			}
		});
	}
}
