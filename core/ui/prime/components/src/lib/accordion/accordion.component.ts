import { Component, ContentChild, Input } from "@angular/core";
import { AccordionPanelsComponent } from "./accordion-panels.component";

@Component({
	selector: "lens-accordion",
	templateUrl: "accordion.component.html"
})
export class AccordionComponent {
	@Input() activeIndex = -1;

	@ContentChild(AccordionPanelsComponent) public panels!: AccordionPanelsComponent;
}
