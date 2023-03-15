import { Component, ContentChild } from "@angular/core";
import { TabPanelsComponent } from "./tab-panels.component";

@Component({
	selector: "lens-tab-view",
	templateUrl: "tab-view.component.html"
})
export class TabViewComponent {
	@ContentChild(TabPanelsComponent) public panels!: TabPanelsComponent;
}
