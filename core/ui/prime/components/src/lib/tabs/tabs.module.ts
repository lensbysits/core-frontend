import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TabViewModule as PrimeTabsModule } from "primeng/tabview";
import { TabPanelComponent } from "./tab-panel.component";
import { TabPanelsComponent } from "./tab-panels.component";
import { TabsComponent } from "./tabs.component";

@NgModule({
	imports: [CommonModule, PrimeTabsModule],
	declarations: [TabsComponent, TabPanelsComponent, TabPanelComponent],
	exports: [TabsComponent, TabPanelsComponent, TabPanelComponent]
})
export class TabsModule {}
