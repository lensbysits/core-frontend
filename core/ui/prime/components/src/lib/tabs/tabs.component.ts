import { Component, ContentChild } from "@angular/core";
import { TabPanelsComponent } from "./tab-panels.component";

@Component({
	selector: "lens-tabs",
	templateUrl: "tabs.component.html"
})
export class TabsComponent {
	@ContentChild(TabPanelsComponent) public panels!: TabPanelsComponent;
}
