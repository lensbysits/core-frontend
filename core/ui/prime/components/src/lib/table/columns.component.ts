import { Component, ContentChildren, QueryList } from "@angular/core";
import { ColumnComponent } from "./column.component";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "lens-table > columns",
    template: ""
})
export class ColumnsComponent {
    @ContentChildren(ColumnComponent) columns!: QueryList<ColumnComponent>;
}