import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { KeyValuePair } from "@lens/app-abstract";
import { ILazyLoadEvent, TableComponent } from "@lens/ui-prime-components";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subject, debounceTime } from "rxjs";
import { Masterdata, MasterdataType } from "../../../core/models";
import { MasterdataCrudHttpService } from "../../../core/services";

@Component({
	selector: "masterdata-list",
	templateUrl: "./masterdata-list.component.html",
	styleUrls: ["./masterdata-list.component.scss"]
})
export class MasterdatasListComponent implements OnInit {
	isLoading = true;
	items: Masterdata[] = [];
	totalSize = 0;
	typeId = "";
	masterdataType$?: Observable<MasterdataType>;
	tagsList: KeyValuePair<string, string>[] = [];
	tagsSelected: string[] = [];

	private searchTermChange = new Subject<string[]>();
	@ViewChild("table", { read: TableComponent }) private table!: TableComponent;

	constructor(
		private readonly service: MasterdataCrudHttpService,
		private readonly router: Router,
		private readonly activeRoute: ActivatedRoute,
		private readonly translateService: TranslateService
	) {}

	public ngOnInit(): void {
		this.typeId = this.activeRoute.snapshot.paramMap.get("masterdatatype") ?? "";

		this.loadTagsList();

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		this.searchTermChange.pipe(debounceTime(500)).subscribe({
			next: selectedTags => {
				this.loadItems(0, this.table.rows, selectedTags);
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	public onLazyLoadData(event: ILazyLoadEvent): void {
		this.loadItems(event.offset, event.rows, this.tagsSelected);
	}

	public onRowClicked(item: Masterdata) {
		this.router.navigate([`${item.id}`], { relativeTo: this.activeRoute });
	}

	public onAddAction() {
		this.router.navigate(["add"], { relativeTo: this.activeRoute });
	}

	public onDeleteActionClicked(item: Masterdata) {
		this.isLoading = true;
		if (!confirm(this.translateService.instant("masterdatamgmt.pages.masterdataList.deleteRowConfirmation")) === true) {
			this.isLoading = false;
			return;
		}

		if (!item.id) {
			this.isLoading = false;
			return;
		}

		this.items = this.items.filter(curitem => item !== curitem);
		this.service.deleteMasterdata(this.typeId, item.id).subscribe({
			next: () => {
				this.totalSize--;
				this.isLoading = false;
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	public onEditActionClicked(item: Masterdata) {
		this.router.navigate([`${item.id}`, "edit"], { relativeTo: this.activeRoute });
	}

	public onTagsChangedFilter(selectedTags: KeyValuePair<string | number, string>[]) {
		this.searchTermChange.next(selectedTags.map(t => t.key as string));
	}

	private loadItems(offset: number, rows: number, tags: string[]) {
		this.isLoading = true;

		if (this.typeId) {
			this.masterdataType$ = this.service.getMasterdataTypeById(this.typeId);
		}

		this.service.getAllMasterdatas(this.typeId, offset, rows, tags).subscribe({
			next: data => {
				this.items = data.value || [];
				this.totalSize = data.totalSize || 0;
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	private loadTagsList() {
		this.isLoading = true;
		this.service.getAllTags(this.typeId, 0, 0).subscribe({
			next: data => {
				this.tagsList = (data.value || []).map(v => new KeyValuePair<string, string>(v, v));
				this.isLoading = false;
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}
}
