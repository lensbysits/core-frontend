import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AccordionModule as PrimeAccordionModule } from "primeng/accordion";
import { AccordionPanelComponent } from "./accordion-panel.component";
import { AccordionPanelsComponent } from "./accordion-panels.component";
import { AccordionComponent } from "./accordion.component";

@NgModule({
	imports: [CommonModule, PrimeAccordionModule],
	declarations: [AccordionComponent, AccordionPanelsComponent, AccordionPanelComponent],
	exports: [AccordionComponent, AccordionPanelsComponent, AccordionPanelComponent]
})
export class AccordionModule {}
