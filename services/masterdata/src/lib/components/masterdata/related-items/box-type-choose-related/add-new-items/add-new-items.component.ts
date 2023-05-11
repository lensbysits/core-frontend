import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastService } from "@lens/app-abstract";
import { TranslateService } from "@ngx-translate/core";
import { Subject, takeUntil } from "rxjs";
import { IMasterdataRelatedItemCreate } from "../../../../../core/interfaces";
import { Masterdata, MasterdataRelatedItemGroupedByTypeItem } from "../../../../../core/models";
import { ICurrentMasterdata, MasterdataCrudHttpService, MasterdataRelatedItemsService } from "../../../../../core/services";
import { getRequiredFieldValue } from "../../../../../core/utils";

@Component({
	selector: "masterdata-related-items-add-new-items",
	templateUrl: "./add-new-items.component.html",
	styleUrls: ["./add-new-items.component.scss"]
})
export class MasterdataRelatedItemsAddNewItemsComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();

	isLoading = false;
	showSelection = false;
	typeMasterdataItems: Masterdata[] = [];
	typeMasterdataItemsFiltered: Masterdata[] = [];
	dataForm!: FormGroup;
	isFormSubmitted = false;
	currentMasterdata: ICurrentMasterdata = {};

	@Input() public typeId = "";
	@Input() public relatedItems: MasterdataRelatedItemGroupedByTypeItem[] = [];

	constructor(
		private readonly service: MasterdataCrudHttpService,
		private readonly relatedItemsService: MasterdataRelatedItemsService,
		private readonly formBuilder: FormBuilder,
		private readonly toastService: ToastService,
		private readonly translateService: TranslateService
	) {
		this.isLoading = true;
		this.relatedItemsService.relatedItems$.pipe(takeUntil(this.destroy$)).subscribe({
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
		this.destroy$.next();
		this.destroy$.complete();
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
				this.typeMasterdataItemsFiltered = this.filterMasterdataItems(this.typeMasterdataItems);
				this.isLoading = false;
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
		if (!this.currentMasterdata.masterdataTypeId || !this.currentMasterdata.masterdataId) {
			return;
		}
		const masterdataTypeId = this.currentMasterdata.masterdataTypeId;
		const masterdataId = this.currentMasterdata.masterdataId;

		this.isFormSubmitted = true;
		if (this.dataForm.invalid) {
			return;
		}

		this.isLoading = true;

		const masterdataItems = getRequiredFieldValue<string[]>(this.dataForm, "masterdataItems");

		let model = [] as IMasterdataRelatedItemCreate[];
		model = masterdataItems.map(item => ({ masterdataId: item })) ?? [];

		this.service.createMasterdataRelatedItems(masterdataTypeId, masterdataId, model).subscribe({
			next: () => {
				this.isLoading = false;
				this.resetDataForm();
				this.relatedItemsService.markResetRelatedItems();
				this.relatedItemsService.setCurrentOpenedTypeById(this.typeId);

				this.toastService.success(
					// eslint-disable-next-line max-len
					this.translateService.instant("masterdatamgmt.pages.masterdataRelatedItemsBox.boxTypeChooseRelated.addForm.notifications.successAdd.title"),
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

	private filterMasterdataItems(items: Masterdata[]): Masterdata[] {
		const currRelatedIds = this.relatedItems.map(item => item.id);
		return items.filter(item => this.currentMasterdata.masterdataId !== item.id).filter(item => !currRelatedIds.includes(item.id));
	}
}
