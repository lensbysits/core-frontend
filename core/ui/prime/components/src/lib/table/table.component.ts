import { AfterViewInit, Component, ContentChild, EventEmitter, Input, Output, ViewChild } from "@angular/core";

import { LanguageService, MenuItem } from "@lens/app-abstract";
import { TranslateService } from "@ngx-translate/core";
import { Table } from "primeng/table";
import { TieredMenu } from "primeng/tieredmenu";
import { ColumnsComponent } from "./columns.component";
import { RowActionComponent } from "./row-action.component";
import { RowActionsComponent } from "./row-actions.component";
import { ILazyLoadEvent, IOrderByMeta, PaginatorPosition, RowsPerPageOption } from "./table.interface";

@Component({
	selector: "lens-table",
	templateUrl: "table.component.html",
	styleUrls: ["table.component.scss"]
})
export class TableComponent implements AfterViewInit {
	private currentState!: ILazyLoadEvent;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Input() public source!: any[];
	@Input() public totalRecords!: number;
	@Input() public paginator = true;
	@Input() public loading!: boolean;
	@Input() public first = 0; // Index of the first row to be displayed
	@Input() public rows = 10; // Number of rows to display per page
	@Input() public styleClass = "";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Input() public rowsPerPageOptions!: RowsPerPageOption[];
	@Input() public showCurrentPageReport = false;
	@Input() public currentPageReportTemplate = "{currentPage} of {totalPages}";
	@Input() public paginatorPosition: PaginatorPosition = "bottom";
	@Input() public orderBy: IOrderByMeta = { field: "", direction: "asc" };
	@Input() public lazyLoadOnInit = true;

	@Output() public lazyLoad = new EventEmitter<ILazyLoadEvent>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Output() public rowClicked = new EventEmitter<any>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Output() public rowDblClick = new EventEmitter<any>();

	@ContentChild(ColumnsComponent) public columns!: ColumnsComponent;
	@ContentChild(RowActionsComponent) public rowActions!: RowActionsComponent;

	@ViewChild("tableRef", { read: Table }) public tableRef!: Table;

	constructor(languageService?: LanguageService, private translateService?: TranslateService) {
		languageService?.onTranslationsLoaded(() => this.initRowActions);
		translateService?.onLangChange.subscribe(() => this.initRowActions());
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public itemOfContextMenuClickedRow: any;
	public rowActionItems!: MenuItem[];

	public ngAfterViewInit(): void {
		setTimeout(() => {
			// to circumvent the ecaihbce exception https://stackoverflow.com/questions/43375532/expressionchangedafterithasbeencheckederror-explained
			this.initRowActions();
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onLazyLoadData(event: any): void {
		this.currentState = {
			offset: event.first,
			rows: event.rows,
			orderBy: {
				field: event.sortField,
				direction: `${event.sortOrder === 1 ? "asc" : "desc"}`
			}
		};
		this.lazyLoad.emit(this.currentState);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onRowClicked(item: any): void {
		this.rowClicked.emit(item);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onRowDblClicked(item: any): void {
		this.rowDblClick.emit(item);
	}

	public hasRowActions(): boolean {
		return this.rowActions?.actions.length > 0;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onRowActionButtonClicked(menu: TieredMenu, event: MouseEvent, item: any): void {
		this.itemOfContextMenuClickedRow = item;
		menu.toggle(event);
		event.stopPropagation();
	}

	private initRowActions() {
		setTimeout(() => {
			// to circumvent the ecaihbce exception https://stackoverflow.com/questions/43375532/expressionchangedafterithasbeencheckederror-explained
			this.rowActionItems = this.rowActions?.actions.map((action: RowActionComponent) => {
				const label = action.translationKey ? this.translateService?.instant(action.translationKey) : action.label;
				return {
					id: action.id,
					icon: action.icon,
					label: label,
					command: () => {
						action.clicked.emit(this.itemOfContextMenuClickedRow);
					}
				};
			});
		});
	}
}
