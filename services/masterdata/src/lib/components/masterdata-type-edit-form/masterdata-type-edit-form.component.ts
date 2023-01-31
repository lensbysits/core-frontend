import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { JsonEditorComponent, JsonEditorOptions } from "@maaxgr/ang-jsoneditor";
import { getRequiredFieldValue, getFieldValue } from "../../core/utils";
import { MasterdataType } from "../../core/models";
import { IMasterdataTypeCreate, IMasterdataTypeUpdate } from "../../core/interfaces";
import { MasterdataCrudHttpService } from "../../core/services";
import { MasterdataTypeMaxLength } from "../../core/utils";
import { ToastService } from "@lens/app-abstract";

@Component({
	selector: "lens-masterdata-type-edit-form",
	templateUrl: "./masterdata-type-edit-form.component.html",
	styleUrls: ["./masterdata-type-edit-form.component.scss"]
})
export class MasterdataTypeEditFormComponent implements OnInit {
	isLoading = false;
	id!: string;
	dataForm!: FormGroup;
	isFormSubmitted = false;
	isAddForm = true;
	saveBtnText = "Save";
	formTitle = "Add";
	item?: MasterdataType;
	maxLength = MasterdataTypeMaxLength;

	@ViewChild(JsonEditorComponent, { static: false }) metadataEditor!: JsonEditorComponent;

	constructor(
		private readonly service: MasterdataCrudHttpService,
		private readonly router: Router,
		private readonly activeRoute: ActivatedRoute,
		private readonly formBuilder: FormBuilder,
		private readonly toastService: ToastService
	) {}

	ngOnInit(): void {
		this.id = this.activeRoute.snapshot.params["masterdatatype"];
		this.isAddForm = !(this.id !== undefined);

		if (!this.isAddForm) {
			this.loadData();
			this.saveBtnText = "Update";
			this.formTitle = "Edit";
		}

		this.dataForm = this.formBuilder.group({
			code: ["", [Validators.required, Validators.maxLength(this.maxLength.code)]],
			name: ["", [Validators.required, Validators.maxLength(this.maxLength.name)]],
			description: ["", [Validators.maxLength(this.maxLength.description)]],
			metadata: ["", [Validators.maxLength(this.maxLength.metadata)]]
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
		this.service.getMasterdataTypeById(this.id).subscribe(data => {
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

			this.service.createMasterdataType(model).subscribe(() => {
				this.navigateToListView();
				this.isLoading = false;
				this.toastService.success("Add masterdata type", "The masterdata type was succesfully added.");
			});
		} else {
			const model = {} as IMasterdataTypeUpdate;
			model.name = name;
			model.description = description;
			model.metadata = metadata;

			this.service.updateMasterdataType(this.id, model).subscribe(() => {
				this.navigateToListView();
				this.isLoading = false;
				this.toastService.success("Update masterdata type", "The masterdata type was succesfully updated.");
			});
		}
	}

	btnCancel() {
		this.navigateToListView();
	}

	navigateToListView() {
		this.router.navigate(["/"]);
	}
}
