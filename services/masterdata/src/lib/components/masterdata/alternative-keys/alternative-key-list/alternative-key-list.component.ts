import { Component, Input, OnDestroy } from "@angular/core";
import { ILazyLoadEvent } from "@lens/ui-prime-components";
import { TranslateService } from "@ngx-translate/core";
import { Subject, takeUntil } from "rxjs";
import { MasterdataAlternativeKey } from "../../../../core/models";
import { MasterdataAlternativeKeyService, MasterdataCrudHttpService } from "../../../../core/services";

@Component({
	selector: "masterdata-alternative-key-list",
	templateUrl: "./alternative-key-list.component.html"
})
export class MasterdataAlternativeKeyListComponent implements OnDestroy {
	private destroy$ = new Subject<void>();

	isLoading = false;
	items: MasterdataAlternativeKey[] = [];
	totalSize = 0;

	@Input() public typeId = "";
	@Input() public masterdataId = "";
	@Input() public viewOnly = true;

	constructor(
		private readonly service: MasterdataCrudHttpService,
		private readonly translateService: TranslateService,
		private readonly alternativeKeyService: MasterdataAlternativeKeyService
	) {
		this.isLoading = true;
		this.alternativeKeyService.alternativeKeyAdded$.pipe(takeUntil(this.destroy$)).subscribe({
			next: () => {
				this.loadItems(0, 0);
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	public ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private loadItems(offset: number, rows: number) {
		this.isLoading = true;
		this.service.getAllMasterdataAlternativeKeys(this.typeId, this.masterdataId, offset, rows).subscribe({
			next: data => {
				this.items = data.value || [];
				this.totalSize = data.totalSize || 0;
				this.isLoading = false;
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public onLazyLoadData(event: ILazyLoadEvent): void {
		this.loadItems(0, 0);
	}

	public onDeleteActionClicked(item: MasterdataAlternativeKey) {
		this.isLoading = true;
		if (!confirm(this.translateService.instant("masterdatamgmt.pages.masterdataAlternativeKeyList.deleteRowConfirmation")) === true) {
			this.isLoading = false;
			return;
		}

		if (!item.id) {
			this.isLoading = false;
			return;
		}

		this.items = this.items.filter(curitem => item !== curitem);
		this.service.deleteMasterdataAlternativeKey(this.typeId, this.masterdataId, item.id).subscribe({
			next: () => {
				this.totalSize--;
				this.isLoading = false;
				this.alternativeKeyService.onAlternativeKeyRemoved();
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}
}
