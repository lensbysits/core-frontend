import { Component, ContentChild, Input, ViewChild } from "@angular/core";

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: "lens-table > columns > column",
	template: ""
})
export class ColumnComponent {
	@Input() label!: string;
	@Input() field!: string;
	@Input() sortable = false;
	@Input() sortField!: string;

	@ContentChild(ViewChild) public content?: ViewChild;
}
