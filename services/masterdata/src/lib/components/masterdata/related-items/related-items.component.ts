import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { MasterdataRelatedItem, MasterdataRelatedItemGroupedByType } from "../../../core/models";
import { MasterdataCrudHttpService, MasterdataRelatedItemsService } from "../../../core/services";

@Component({
	selector: "masterdata-related-items",
	templateUrl: "./related-items.component.html",
	styleUrls: ["./related-items.component.scss"]
})
export class MasterdataRelatedItemsComponent implements OnInit, OnChanges {
	private relatedItems: MasterdataRelatedItem[] = [];
	private relatedItemsGrouped: MasterdataRelatedItemGroupedByType[] = [];

	isLoading = false;

	@Input() public showHeader = false;
	@Input() public typeId = "";
	@Input() public masterdataId = "";

	constructor(private readonly service: MasterdataCrudHttpService, public readonly relatedItemsService: MasterdataRelatedItemsService) {}

	ngOnInit(): void {
		this.loadRelatedItems();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	ngOnChanges(changes: SimpleChanges) {
		console.log("main/changes", this.relatedItems);
		console.log("main/changes-grouped", this.mapRelatedItemsGroupedByType(this.relatedItems));
		this.relatedItemsGrouped = this.mapRelatedItemsGroupedByType(this.relatedItems);
	}

	loadRelatedItems() {
		this.isLoading = true;
		this.service.getRelatedItems(this.typeId, this.masterdataId).subscribe({
			next: data => {
				this.relatedItems = data.value || [];
				this.relatedItemsGrouped = this.mapRelatedItemsGroupedByType(this.relatedItems);
				this.relatedItemsService.addRelatedItems(this.relatedItemsGrouped);
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
				name: item.name
			});
		});
		return itemsGrouped;
	}
}
