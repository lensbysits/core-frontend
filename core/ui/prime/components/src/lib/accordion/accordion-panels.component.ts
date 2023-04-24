import { Component, ContentChildren, QueryList } from "@angular/core";
import { AccordionPanelComponent } from "./accordion-panel.component";

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: "lens-accordion > accordion-panels",
	template: "<ng-content></ng-content>"
})
export class AccordionPanelsComponent {
	@ContentChildren(AccordionPanelComponent) panels!: QueryList<AccordionPanelComponent>;
}
