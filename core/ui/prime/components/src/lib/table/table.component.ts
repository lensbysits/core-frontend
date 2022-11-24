import { AfterViewInit, Component, ContentChild, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { MenuItem } from "primeng/api";
import { TieredMenu } from "primeng/tieredmenu";
import { ColumnsComponent } from "./columns.component";
import { ILazyLoadEvent } from "./lazy-load-event.interface";
import { RowActionComponent } from "./row-action.component";
import { RowActionsComponent } from "./row-actions.component";

@Component({
    selector: "lens-table",
    templateUrl: "table.component.html",
    styleUrls: [ "table.component.scss" ]
})
export class TableComponent implements AfterViewInit {
    @Input() public source!: any[];
    @Input() public totalRecords!: number;
    @Input() public loading!: boolean;

    @Output() public onLazyLoad = new EventEmitter<ILazyLoadEvent>();
    @Output() public onRowClick = new EventEmitter<any>();

    @ContentChild(ColumnsComponent) public columns!: ColumnsComponent;
    @ContentChild(RowActionsComponent) public rowActions!: RowActionsComponent;

    public contextMenuItems: MenuItem[] = []
    public itemOfContextMenuClickedRow: any;

    public ngAfterViewInit(): void {
        this.contextMenuItems = this.rowActions?.actions.map((action: RowActionComponent) => ({
            icon: action.icon,
            label: action.label,
            command: () => action.clicked.emit(this.itemOfContextMenuClickedRow)
        }))
    }

    public onLazyLoadData(event: any): void {
        this.onLazyLoad.emit({
            offset: event.first,
            rows: event.rows
        });
    }

    public onRowClicked(item: any): void {
        this.onRowClick.emit(item);
    }

    public hasRowActions(): boolean {
        return this.rowActions?.actions.length > 0;
    }

    public onRowActionButtonClicked(menu: TieredMenu, event: MouseEvent, item: any): void {
        this.itemOfContextMenuClickedRow = item;
        menu.toggle(event);
        event.stopPropagation();
    }
}