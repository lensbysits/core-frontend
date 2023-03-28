import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastService } from "@lens/app-abstract";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { IMasterdataRelatedItemCreate } from "../../../../../core/interfaces";
import { Masterdata } from "../../../../../core/models";
import { ICurrentMasterdata, MasterdataCrudHttpService, MasterdataRelatedItemsService } from "../../../../../core/services";
import { getRequiredFieldValue } from "../../../../../core/utils";

@Component({
	selector: "masterdata-related-items-add-new-items",
	templateUrl: "./add-new-items.component.html",
	styleUrls: ["./add-new-items.component.scss"]
})
export class MasterdataRelatedItemsAddNewItemsComponent implements OnInit, OnDestroy {
	isLoading = false;
	showSelection = false;
	typeMasterdataItems: Masterdata[] = [];
	dataForm!: FormGroup;
	isFormSubmitted = false;
	currentMasterdata: ICurrentMasterdata = {};
	relatedItemsSubscription: Subscription;

	@Input() public typeId = "";

	constructor(
		private readonly service: MasterdataCrudHttpService,
		private readonly relatedItemsService: MasterdataRelatedItemsService,
		private readonly formBuilder: FormBuilder,
		private readonly toastService: ToastService,
		private readonly translateService: TranslateService
	) {
		this.isLoading = true;
		this.relatedItemsSubscription = this.relatedItemsService.relatedItems$.subscribe({
			next: () => {
				this.currentMasterdata = this.relatedItemsService.CurrentMasterdata;
				this.isLoading = false;
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	ngOnInit(): void {
		this.dataForm = this.formBuilder.group({
			masterdataItems: ["", [Validators.required]]
		});
	}

	ngOnDestroy() {
		if (this.relatedItemsSubscription) {
			this.relatedItemsSubscription.unsubscribe();
		}
	}

	// convenience getter for easy access to form fields
	get getFormFields() {
		return this.dataForm.controls;
	}

	loadTypeMasterdataItems() {
		this.isLoading = true;
		this.service.getAllMasterdatas(this.typeId, 0, 0, []).subscribe({
			next: data => {
				this.typeMasterdataItems = data.value || [];
				this.isLoading = false;
				console.log("add-new-items/loadTypeMasterdataItems", this.typeMasterdataItems);
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	onAddNewRelatedItems() {
		this.showSelection = true;
		this.loadTypeMasterdataItems();
	}

	btnCancel() {
		this.showSelection = false;
		this.resetDataForm();
	}

	onSubmit() {
		this.isFormSubmitted = true;
		if (this.dataForm.invalid) {
			// stop here if form is invalid
			return;
		}

		this.isLoading = true;

		const masterdataItems = getRequiredFieldValue<string[]>(this.dataForm, "masterdataItems");

		let model = [] as IMasterdataRelatedItemCreate[];
		model = masterdataItems.map(item => ({ masterdataId: item })) ?? [];

		this.service
			.createMasterdataRelatedItems(this.currentMasterdata.masterdataTypeId ?? "", this.currentMasterdata.masterdataId ?? "", model)
			.subscribe({
				next: () => {
					this.isLoading = false;
					this.resetDataForm();

					this.toastService.success(
						this.translateService.instant(
							"masterdatamgmt.pages.masterdataRelatedItemsBox.boxTypeChooseRelated.addForm.notifications.successAdd.title"
						),
						this.translateService.instant(
							"masterdatamgmt.pages.masterdataRelatedItemsBox.boxTypeChooseRelated.addForm.notifications.successAdd.message"
						)
					);
				},
				complete: () => (this.isLoading = false),
				error: () => (this.isLoading = false)
			});
	}

	private resetDataForm() {
		this.isFormSubmitted = false;
		this.dataForm.reset();
	}
}
