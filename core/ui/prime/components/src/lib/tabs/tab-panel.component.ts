import { Component, Input, TemplateRef, ViewChild } from "@angular/core";

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: "lens-tabs > tab-panels > tab-panel",
	template: "<ng-template #template><ng-content></ng-content></ng-template>"
})
export class TabPanelComponent {
	@Input() header!: string;
	@Input() selected = false;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@ViewChild("template", { static: true }) public template!: TemplateRef<any>;
}
