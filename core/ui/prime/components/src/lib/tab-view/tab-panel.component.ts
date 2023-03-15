import { Component, ContentChild, Input, ViewChild } from "@angular/core";

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: "lens-tab-view > tab-panels > tab-panel",
	template: "<ng-content select='{{ curId }}'></ng-content>"
})
export class TabPanelComponent {
	@Input() header!: string;
	@Input() id!: string;
	curId = `[${this.id}]`;

	@ContentChild(ViewChild) public content?: ViewChild; //, { static: true }
}
