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
	isLoading = false;
	items: Masterdata[] = [];
	totalSize = 0;
	typeId = "";
	masterdataType$?: Observable<MasterdataType>;
	tagsList: string[] = [];
	tagsSelected: KeyValuePair<string, string>[] = [];
	lang = ""; // interface current language; used as an workaround to refresh the lens-table html template view!

	private searchTermChange = new Subject<KeyValuePair<string, string>[]>();
	@ViewChild("table", { read: TableComponent }) private table!: TableComponent;

	constructor(
		private readonly service: MasterdataCrudHttpService,
		private readonly router: Router,
		private readonly activeRoute: ActivatedRoute,
		private readonly translateService: TranslateService
	) {
		this.isLoading = true;
		this.translateService.onLangChange.subscribe(() => {
			this.lang = this.translateService.store.currentLang;
		});
	}

	ngOnInit(): void {
		this.typeId = this.activeRoute.snapshot.paramMap.get("masterdatatype") ?? "";

		this.loadTagsList();

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		this.searchTermChange.pipe(debounceTime(500)).subscribe({
			next: selectedTags => {
				this.loadItems(0, this.table.rows, this.convertTagsToValue(selectedTags));
				this.isLoading = false;
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	loadItems(offset: number, rows: number, tags: string[]) {
		this.isLoading = true;

		if (this.typeId) this.masterdataType$ = this.service.getMasterdataTypeById(this.typeId);

		this.service.getAllMasterdatas(this.typeId, offset, rows, tags).subscribe({
			next: data => {
				this.items = data.value || [];
				this.totalSize = data.totalSize || 0;
				this.isLoading = false;
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	loadTagsList() {
		this.isLoading = true;
		this.service.getAllTags(this.typeId, 0, 0).subscribe({
			next: data => {
				this.tagsList = data.value || [];
				this.isLoading = false;
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	onLazyLoadData(event: ILazyLoadEvent): void {
		this.loadItems(event.offset, event.rows, this.convertTagsToValue(this.tagsSelected));
	}

	onRowClicked(item: Masterdata) {
		this.router.navigate([`${item.id}`], { relativeTo: this.activeRoute });
	}

	onAddAction() {
		this.router.navigate(["add"], { relativeTo: this.activeRoute });
	}

	onDeleteActionClicked(item: Masterdata) {
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

	onEditActionClicked(item: Masterdata) {
		this.router.navigate([`${item.id}`, "edit"], { relativeTo: this.activeRoute });
	}

	onTagsChangedFilter(selectedTags: KeyValuePair<string, string>[]) {
		this.searchTermChange.next(selectedTags);
	}

	private convertTagsToValue(tags: KeyValuePair<string, string>[]) {
		return tags.map(item => item.value);
	}
}
