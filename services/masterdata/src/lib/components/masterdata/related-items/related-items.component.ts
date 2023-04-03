import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { MasterdataRelatedItem, MasterdataRelatedItemGroupedByType } from "../../../core/models";
import { MasterdataCrudHttpService, MasterdataRelatedItemsService } from "../../../core/services";

@Component({
	selector: "masterdata-related-items",
	templateUrl: "./related-items.component.html",
	styleUrls: ["./related-items.component.scss"]
})
export class MasterdataRelatedItemsComponent implements OnInit, OnDestroy, OnChanges {
	private destroy$ = new Subject<void>();
	private relatedItems: MasterdataRelatedItem[] = [];
	private relatedItemsGrouped: MasterdataRelatedItemGroupedByType[] = [];

	isLoading = false;

	@Input() public typeId = "";
	@Input() public masterdataId = "";
	@Input() public showHeader = true;
	@Input() public viewOnly = false;

	constructor(private readonly service: MasterdataCrudHttpService, public readonly relatedItemsService: MasterdataRelatedItemsService) {
		this.relatedItemsService.reset$.pipe(takeUntil(this.destroy$)).subscribe({
			next: () => {
				this.loadRelatedItems();
			}
		});
	}

	ngOnInit(): void {
		this.loadRelatedItems();
		this.relatedItemsService.CurrentMasterdata = {
			masterdataTypeId: this.typeId,
			masterdataId: this.masterdataId
		};
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	ngOnChanges(changes: SimpleChanges) {
		this.relatedItemsGrouped = this.mapRelatedItemsGroupedByType(this.relatedItems);
	}

	loadRelatedItems() {
		this.isLoading = true;
		this.service.getRelatedItems(this.typeId, this.masterdataId).subscribe({
			next: data => {
				this.relatedItems = data.value || [];
				this.relatedItemsGrouped = this.mapRelatedItemsGroupedByType(this.relatedItems);
				this.relatedItemsService.resetRelatedItems(this.relatedItemsGrouped);
				this.isLoading = false;
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	mapRelatedItemsGroupedByType(items: MasterdataRelatedItem[]): MasterdataRelatedItemGroupedByType[] {
		const itemsGrouped: MasterdataRelatedItemGroupedByType[] = [];
		items.forEach(item => {
			let typeFoundIndex = itemsGrouped.findIndex(elem => elem.typeId === item.masterdataTypeId);
			if (typeFoundIndex === -1) {
				itemsGrouped.push({
					typeId: item.masterdataTypeId,
					typeName: item.masterdataTypeName,
					items: []
				});
				typeFoundIndex = itemsGrouped.length - 1;
			}
			itemsGrouped[typeFoundIndex].items?.push({
				id: item.id,
				name: item.name,
				link: `./${item.masterdataTypeId}/${item.id}/edit`
			});
		});
		return itemsGrouped;
	}
}
