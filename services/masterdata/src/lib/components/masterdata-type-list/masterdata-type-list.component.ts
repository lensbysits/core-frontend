import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ILazyLoadEvent } from "@lens/ui-prime-components";
import { MasterdataType } from "../../core/models";
import { MasterdataCrudHttpService } from "../../core/services";

@Component({
	selector: "lens-masterdata-type-list",
	templateUrl: "./masterdata-type-list.component.html",
	styleUrls: ["./masterdata-type-list.component.scss"]
})
export class MasterdataTypeListComponent implements OnInit {
	isLoading = false;
	items: MasterdataType[] = [];
	totalSize = 0;

	constructor(private readonly service: MasterdataCrudHttpService, private readonly router: Router, private readonly activeRoute: ActivatedRoute) {}

	// eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
	ngOnInit(): void {
		this.isLoading = true;
		// this.loadItems();
	}

	loadItems(offset: number, rows: number) {
		this.isLoading = true;
		this.service.getAllMasterdataTypes(offset, rows).subscribe({
			next: (data) => {
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
			// queryParams: { id: item.id },
		});
		// this.router.navigate([`/type/details/${item.id}`]);
	}

	onAddAction() {
		this.router.navigate([`/add`]);
	}

	onDeleteActionClicked(item: MasterdataType) {
		this.isLoading = true;
		if (!confirm("Are you sure?") === true) {
			this.isLoading = false;
			return;
		}

		if (!item.id) {
			this.isLoading = false;
			return;
		}

		this.items = this.items.filter((curitem) => item !== curitem);
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
