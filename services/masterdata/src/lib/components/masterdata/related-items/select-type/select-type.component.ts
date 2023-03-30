import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { MasterdataType } from "../../../../core/models";
import { MasterdataCrudHttpService, MasterdataRelatedItemsService } from "../../../../core/services";

@Component({
	selector: "masterdata-related-items-select-type",
	templateUrl: "./select-type.component.html",
	styleUrls: ["./select-type.component.scss"]
})
export class MasterdataRelatedItemsSelectTypeComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();

	isLoading = false;
	typesList: MasterdataType[] = [];
	typesListAvailable: MasterdataType[] = [];

	constructor(private readonly service: MasterdataCrudHttpService, private readonly relatedItemsService: MasterdataRelatedItemsService) {
		this.isLoading = true;
		this.relatedItemsService.relatedItems$.pipe(takeUntil(this.destroy$)).subscribe({
			next: () => {
				this.typesListAvailable = this.setTypesListAvailable(this.typesList);
				this.isLoading = false;
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	ngOnInit(): void {
		this.loadTypesList();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	loadTypesList() {
		this.isLoading = true;
		this.service.getAllMasterdataTypes(0, 0).subscribe({
			next: data => {
				this.typesList = data.value || [];
				this.typesListAvailable = this.setTypesListAvailable(this.typesList);
				this.isLoading = false;
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	onTypeChanged(selectedItem: string): void {
		if (!selectedItem) {
			return;
		}
		const typeName = this.typesList.find(item => item.id === selectedItem)?.name ?? "";
		this.relatedItemsService.addRelatedItems({
			typeId: selectedItem,
			typeName: typeName,
			items: []
		});

		this.relatedItemsService.setCurrentOpenedTypeById(selectedItem);
	}

	private setTypesListAvailable(types: MasterdataType[]): MasterdataType[] {
		const result = types.filter(item => {
			return !this.relatedItemsService.RelatedItems?.some(elem => elem.typeId === item.id);
		});
		return result;
	}
}
