import { Component, ContentChild, EventEmitter, Input, Output } from "@angular/core";
import { ColumnsComponent } from "./columns.component";
import { ILazyLoadEvent } from "./lazy-load-event.interface";

@Component({
    selector: "lens-table",
    templateUrl: "table.component.html"
})
export class TableComponent {
    @Input() public source!: any[];
    @Input() public totalRecords!: number;
    @Input() public loading!: boolean;

    @Output() public onLazyLoad = new EventEmitter<ILazyLoadEvent>();

    @ContentChild(ColumnsComponent) public columns!: ColumnsComponent;

    public onLazyLoadData(event: any): void {
        this.onLazyLoad.emit({
            offset: event.first,
            rows: event.rows
        });
    }
}