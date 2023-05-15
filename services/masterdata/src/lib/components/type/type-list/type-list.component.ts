import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LanguageService } from "@lens/app-abstract";
import { ILazyLoadEvent } from "@lens/ui-prime-components";
import { TranslateService } from "@ngx-translate/core";
import { MasterdataType } from "../../../core/models";
import { MasterdataCrudHttpService } from "../../../core/services";

@Component({
	selector: "masterdata-type-list",
	templateUrl: "./type-list.component.html",
	styleUrls: ["./type-list.component.scss"]
})
export class MasterdataTypeListComponent {
	isLoading = false;
	items: MasterdataType[] = [];
	totalSize = 0;

	constructor(
		private readonly service: MasterdataCrudHttpService,
		private readonly router: Router,
		private readonly activeRoute: ActivatedRoute,
		private readonly translateService: TranslateService,
		private readonly languageService: LanguageService
	) {
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
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
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
		this.service.deleteMasterdataType(item.id).subscribe({
			next: () => {
				this.totalSize--;
				this.isLoading = false;
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
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
