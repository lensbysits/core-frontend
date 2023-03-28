import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { MasterdataRelatedItemGroupedByType } from "../../../../core/models";
import { MasterdataCrudHttpService, MasterdataRelatedItemsService } from "../../../../core/services";

@Component({
	selector: "masterdata-related-items-list-by-type",
	templateUrl: "./list-by-type.component.html",
	styleUrls: ["./list-by-type.component.scss"]
})
export class MasterdataRelatedItemsListByTypeComponent {
	isLoading = false;
	relatedItems: MasterdataRelatedItemGroupedByType[] = [];
	relatedItemsSubscription: Subscription;

	constructor(private readonly service: MasterdataCrudHttpService, public readonly relatedItemsService: MasterdataRelatedItemsService) {
		this.isLoading = true;
		this.relatedItemsSubscription = this.relatedItemsService.relatedItems$.subscribe({
			next: () => {
				this.relatedItems = this.relatedItemsService.getRelatedItemsGroupedByType();
				this.isLoading = false;
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	buildTypeName(type: MasterdataRelatedItemGroupedByType) {
		return `${type.typeName} (${type.items.length})`;
	}
}
