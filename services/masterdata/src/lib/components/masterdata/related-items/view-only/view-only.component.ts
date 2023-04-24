import { Component, OnDestroy } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { MasterdataRelatedItemGroupedByType } from "../../../../core/models";
import { MasterdataCrudHttpService, MasterdataRelatedItemsService } from "../../../../core/services";

@Component({
	selector: "masterdata-related-items-view-only",
	templateUrl: "./view-only.component.html",
	styleUrls: ["./view-only.component.scss"]
})
export class MasterdataRelatedItemsViewOnlyComponent implements OnDestroy {
	private destroy$ = new Subject<void>();

	isLoading = false;
	relatedItems: MasterdataRelatedItemGroupedByType[] = [];

	constructor(private readonly service: MasterdataCrudHttpService, public readonly relatedItemsService: MasterdataRelatedItemsService) {
		this.isLoading = true;
		this.relatedItemsService.relatedItems$.pipe(takeUntil(this.destroy$)).subscribe({
			next: () => {
				this.relatedItems = this.relatedItemsService.getRelatedItemsGroupedByType();
				this.isLoading = false;
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
