import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, debounceTime, Subject } from "rxjs";
import { ILazyLoadEvent, TableComponent } from "@lens/ui-prime-components";
import { KeyValuePair } from "../../core/utils";
import { Masterdata, MasterdataType } from "../../core/models";
import { MasterdataCrudHttpService } from "../../core/services";

@Component({
	selector: "lens-masterdatas-list",
	templateUrl: "./masterdatas-list.component.html",
	styleUrls: ["./masterdatas-list.component.scss"]
})
export class MasterdatasListComponent implements OnInit {
	isLoading = false;
	items: Masterdata[] = [];
	totalSize = 0;
	typeId = "";
	masterdataType$?: Observable<MasterdataType>;
  tagsList: string[] = [];
  tagsSelected: KeyValuePair<string, string>[] = [];

  private searchTermChange = new Subject<KeyValuePair<string, string>[]>();
  @ViewChild("table", { read: TableComponent }) private table!: TableComponent;

	constructor(private readonly service: MasterdataCrudHttpService, private readonly router: Router, private readonly activeRoute: ActivatedRoute) {}

	// eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
	ngOnInit(): void {
		this.isLoading = true;
		this.typeId = this.activeRoute.snapshot.paramMap.get("masterdatatype") ?? "";

    this.loadTagsList();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.searchTermChange.pipe(debounceTime(500)).subscribe((selectedTags) => this.loadItems(0, this.table.rows, this.convertTagsToValue(selectedTags)));
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
			complete: () => {
				this.isLoading = false;
			}
		});
	}

	loadTagsList() {
		this.isLoading = true;
		this.service.getAllTags(this.typeId, 0, 0).subscribe({
			next: data => {
				this.tagsList = data.value || [];
				this.isLoading = false;
			},
			complete: () => {
				this.isLoading = false;
			}
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
		if (!confirm("Are you sure?") === true) {
			this.isLoading = false;
			return;
		}

		if (!item.id) {
			this.isLoading = false;
			return;
		}

		this.items = this.items.filter(curitem => item !== curitem);
		this.service.deleteMasterdata(this.typeId, item.id).subscribe(() => {
			this.totalSize--;
			this.isLoading = false;
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
