import { AfterViewInit, Component, ContentChild, EventEmitter, Input, Output } from "@angular/core";
import { MenuItem } from "primeng/api";
import { TieredMenu } from "primeng/tieredmenu";
import { ColumnsComponent } from "./columns.component";
import { ILazyLoadEvent } from "./lazy-load-event.interface";
import { RowActionComponent } from "./row-action.component";
import { RowActionsComponent } from "./row-actions.component";

@Component({
	selector: "lens-table",
	templateUrl: "table.component.html",
	styleUrls: ["table.component.scss"]
})
export class TableComponent implements AfterViewInit {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Input() public source!: any[];
	@Input() public totalRecords!: number;
	@Input() public loading!: boolean;
	@Input() public rows = 10;

	@Output() public lazyLoad = new EventEmitter<ILazyLoadEvent>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Output() public rowClicked = new EventEmitter<any>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Output() public rowDblClick = new EventEmitter<any>();

	@ContentChild(ColumnsComponent) public columns!: ColumnsComponent;
	@ContentChild(RowActionsComponent) public rowActions!: RowActionsComponent;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public itemOfContextMenuClickedRow: any;
	public rowActionItems!: MenuItem[];

	public ngAfterViewInit(): void {
		setTimeout(() => { // to circumvent the ecaihbce exception https://stackoverflow.com/questions/43375532/expressionchangedafterithasbeencheckederror-explained
			this.rowActionItems = this.rowActions?.actions.map((action: RowActionComponent) => ({
				id:action.id,
				icon: action.icon,
				label: action.label,
				command: () => {
					action.clicked.emit(this.itemOfContextMenuClickedRow);
				}
			}));
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onLazyLoadData(event: any): void {
		this.lazyLoad.emit({
			offset: event.first,
			rows: event.rows
		});
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
}
