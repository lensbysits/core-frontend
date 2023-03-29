import { Component, Input, TemplateRef, ViewChild } from "@angular/core";

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: "lens-accordion > accordion-panels > accordion-panel",
	template: "<ng-template #template><ng-content></ng-content></ng-template>"
})
export class AccordionPanelComponent {
	@Input() header!: string;

	@ViewChild("template") public template!: TemplateRef<any>;
}
