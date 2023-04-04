import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastService } from "@lens/app-abstract";
import { IListboxOptionTextClick } from "@lens/ui-prime-components";
import { TranslateService } from "@ngx-translate/core";
import { Subject, takeUntil } from "rxjs";
import { MasterdataRelatedItemGroupedByTypeItem } from "../../../../../core/models";
import { ICurrentMasterdata, MasterdataCrudHttpService, MasterdataRelatedItemsService } from "../../../../../core/services";
import { getRequiredFieldValue } from "../../../../../core/utils";

@Component({
	selector: "masterdata-related-items-list-items",
	templateUrl: "./list-items.component.html",
	styleUrls: ["./list-items.component.scss"]
})
export class MasterdataRelatedItemsListItemsComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();

	isLoading = false;
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
			listRelatedItems: [[], [Validators.required]]
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

	btnCancel() {
		this.resetDataForm();
		this.relatedItemsService.markResetRelatedItems();
		this.relatedItemsService.setCurrentOpenedTypeById(this.typeId);
	}

	onSubmit() {
		if (!this.currentMasterdata.masterdataTypeId || !this.currentMasterdata.masterdataId) {
			return;
		}
		const masterdataTypeId = this.currentMasterdata.masterdataTypeId;
		const masterdataId = this.currentMasterdata.masterdataId;

		this.isFormSubmitted = true;
		if (this.dataForm.invalid) {
			// stop here if form is invalid
			return;
		}

		this.isLoading = true;
		if (!confirm(this.translateService.instant("masterdatamgmt.pages.masterdataAlternativeKeyList.deleteRowConfirmation")) === true) {
			this.isLoading = false;
			return;
		}

		const listRelatedItems = getRequiredFieldValue<string[]>(this.dataForm, "listRelatedItems");
		const guids = listRelatedItems.filter(el => el !== null && el !== "") ?? [];

		this.service.deleteMasterdataRelatedItems(masterdataTypeId, masterdataId, guids).subscribe({
			next: () => {
				this.isLoading = false;
				this.resetDataForm();
				this.relatedItemsService.markResetRelatedItems();
				this.relatedItemsService.setCurrentOpenedTypeById(this.typeId);

				this.toastService.success(
					this.translateService.instant(
						"masterdatamgmt.pages.masterdataRelatedItemsBox.boxTypeChooseRelated.deleteForm.notifications.successDelete.title"
					),
					this.translateService.instant(
						"masterdatamgmt.pages.masterdataRelatedItemsBox.boxTypeChooseRelated.deleteForm.notifications.successDelete.message"
					)
				);
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	onOptionTextClick(data: IListboxOptionTextClick) {
		const {
			originalEvent: event,
			option: { link = "" }
		} = data;

		event.preventDefault();
		event.stopPropagation();
		if (link !== "") {
			window.open(link, "_blank");
		}
	}

	private resetDataForm() {
		this.isFormSubmitted = false;
		this.dataForm.reset();
	}
}
