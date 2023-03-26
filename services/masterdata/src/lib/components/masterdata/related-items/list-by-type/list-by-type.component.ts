import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MasterdataRelatedItemGroupedByType } from "../../../../core/models";
import { MasterdataCrudHttpService, MasterdataRelatedItemsService } from "../../../../core/services";

@Component({
	selector: "masterdata-related-items-list-by-type",
	templateUrl: "./list-by-type.component.html",
	styleUrls: ["./list-by-type.component.scss"]
})
export class MasterdataRelatedItemsListByTypeComponent implements OnChanges {
	isLoading = false;

	@Input() public relatedItems: MasterdataRelatedItemGroupedByType[] = [];

	constructor(private readonly service: MasterdataCrudHttpService, public readonly relatedItemsService: MasterdataRelatedItemsService) {
		this.isLoading = true;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	ngOnChanges(changes: SimpleChanges) {
		console.log("list-by-type/changes", this.relatedItems);
	}

	getRelatedItems(): MasterdataRelatedItemGroupedByType[] {
		return this.relatedItems;
	}
}
