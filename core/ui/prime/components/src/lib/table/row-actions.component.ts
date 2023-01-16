import { Component, ContentChildren, QueryList } from "@angular/core";
import { RowActionComponent } from "./row-action.component";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "lens-table > row-actions",
    template: ""
})
export class RowActionsComponent {
    @ContentChildren(RowActionComponent) actions!: QueryList<RowActionComponent>;
}