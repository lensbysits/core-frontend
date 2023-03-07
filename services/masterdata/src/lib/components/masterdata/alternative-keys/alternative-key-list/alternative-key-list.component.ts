import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs/internal/Subscription";
import { ILazyLoadEvent } from "@lens/ui-prime-components";
import { MasterdataAlternativeKey } from "../../../../core/models";
import { MasterdataCrudHttpService } from "../../../../core/services";
import { MasterdataAlternativeKeyService } from "../alternative-key.service";

@Component({
	selector: "masterdata-alternative-key-list",
	templateUrl: "./alternative-key-list.component.html"
})
export class MasterdataAlternativeKeyListComponent implements OnInit, OnDestroy {
	isLoading = false;
	items: MasterdataAlternativeKey[] = [];
	totalSize = 0;
	alternativeKeyAddedSubscription: Subscription;

	@Input() public typeId = "";
	@Input() public masterdataId = "";

	constructor(
		private readonly service: MasterdataCrudHttpService,
		private readonly translateService: TranslateService,
		private readonly alternativeKeyService: MasterdataAlternativeKeyService
	) {
		this.isLoading = true;
		this.alternativeKeyAddedSubscription = this.alternativeKeyService.alternativeKeyAdded$.subscribe({
			next: () => {
				this.loadItems(0, 0);
				this.isLoading = false;
			},
			complete: () => this.isLoading = false,
			error: () => this.isLoading = false
		});
	}

	ngOnInit(): void {
		this.isLoading = true;
	}

	ngOnDestroy() {
		if (this.alternativeKeyAddedSubscription) {
			this.alternativeKeyAddedSubscription.unsubscribe();
		}
	}

	loadItems(offset: number, rows: number) {
		this.isLoading = true;
		this.service.getAllMasterdataAlternativeKeys(this.typeId, this.masterdataId, offset, rows).subscribe({
			next: data => {
				this.items = data.value || [];
				this.totalSize = data.totalSize || 0;
				this.isLoading = false;
			},
			complete: () => this.isLoading = false,
			error: () => this.isLoading = false
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onLazyLoadData(event: ILazyLoadEvent): void {
		this.loadItems(0, 0);
	}

	onDeleteActionClicked(item: MasterdataAlternativeKey) {
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
			complete: () => this.isLoading = false,
			error: () => this.isLoading = false
		});
	}
}