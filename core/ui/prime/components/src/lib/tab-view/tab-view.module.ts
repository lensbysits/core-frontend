import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TabViewModule as PrimeTabViewModule } from "primeng/tabview";
import { TabPanelComponent } from "./tab-panel.component";
import { TabPanelsComponent } from "./tab-panels.component";
import { TabViewComponent } from "./tab-view.component";

@NgModule({
	imports: [CommonModule, PrimeTabViewModule],
	declarations: [TabViewComponent, TabPanelsComponent, TabPanelComponent],
	exports: [TabViewComponent, TabPanelsComponent, TabPanelComponent]
})
export class TabViewModule {}
