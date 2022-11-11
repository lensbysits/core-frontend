import { Component, ContentChildren, QueryList } from "@angular/core";
import { ColumnComponent } from "./column.component";

@Component({
    selector: "lens-table > columns",
    template: ""
})
export class ColumnsComponent {
    @ContentChildren(ColumnComponent) columns!: QueryList<ColumnComponent>;
}