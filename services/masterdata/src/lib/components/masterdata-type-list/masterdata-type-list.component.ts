import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ILazyLoadEvent } from "@lens/ui-prime-components";
import { MasterdataType } from "../../core/models";
import { MasterdataCrudHttpService } from "../../core/services";

@Component({
	selector: "masterdata-type-list",
	templateUrl: "./masterdata-type-list.component.html",
	styleUrls: ["./masterdata-type-list.component.scss"]
})
export class MasterdataTypeListComponent implements OnInit {
	isLoading = false;
	items: MasterdataType[] = [];
	totalSize = 0;

	constructor(
		private readonly service: MasterdataCrudHttpService,
		private readonly router: Router,
		private readonly activeRoute: ActivatedRoute,
		private readonly translateService: TranslateService
	) {}

	// eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
	ngOnInit(): void {
		this.isLoading = true;
	}

	loadItems(offset: number, rows: number) {
		this.isLoading = true;
		this.service.getAllMasterdataTypes(offset, rows).subscribe({
			next: data => {
				this.items = data.value || [];
				this.totalSize = data.totalSize || 0;
				this.isLoading = false;
			},
			complete: () => {
				this.isLoading = false;
			}
		});
	}

	onLazyLoadData(event: ILazyLoadEvent): void {
		this.loadItems(event.offset, event.rows);
	}

	onRowClicked(item: MasterdataType) {
		this.router.navigate([`${item.id}`, "details"], {
			relativeTo: this.activeRoute
		});
	}

	onAddAction() {
		this.router.navigate([`/add`]);
	}

	onDeleteActionClicked(item: MasterdataType) {
		this.isLoading = true;
		if (!confirm(this.translateService.instant("masterdatamgmt.pages.masterdataTypeList.deleteRowConfirmation")) === true) {
			this.isLoading = false;
			return;
		}

		if (!item.id) {
			this.isLoading = false;
			return;
		}

		this.items = this.items.filter(curitem => item !== curitem);
		this.service.deleteMasterdataType(item.id).subscribe(() => {
			this.totalSize--;
			this.isLoading = false;
		});
	}

	onEditActionClicked(item: MasterdataType) {
		this.router.navigate([`/${item.id}/edit`]);
	}

	onAddMasterdataActionClicked(item: MasterdataType) {
		this.router.navigate([`/${item.id}/add`]);
	}

	onViewMasterdatasActionClicked(item: MasterdataType) {
		this.router.navigate([`/${item.id}`]);
	}
}
