import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { MasterdataRelatedItemGroupedByType } from "../../../../core/models";
import { MasterdataCrudHttpService, MasterdataRelatedItemsService } from "../../../../core/services";

@Component({
	selector: "masterdata-related-items-view-only",
	templateUrl: "./view-only.component.html",
	styleUrls: ["./view-only.component.scss"]
})
export class MasterdataRelatedItemsViewOnlyComponent implements OnDestroy {
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

	ngOnDestroy() {
		if (this.relatedItemsSubscription) {
			this.relatedItemsSubscription.unsubscribe();
		}
	}
}
