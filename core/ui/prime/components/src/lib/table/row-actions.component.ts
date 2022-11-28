import { Component, ContentChildren, QueryList } from "@angular/core";
import { RowActionComponent } from "./row-action.component";

@Component({
    selector: "lens-table > row-actions",
    template: ""
})
export class RowActionsComponent {
    @ContentChildren(RowActionComponent) actions!: QueryList<RowActionComponent>;
}