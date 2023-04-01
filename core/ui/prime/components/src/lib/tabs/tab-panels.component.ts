import { Component, ContentChildren, QueryList } from "@angular/core";
import { TabPanelComponent } from "./tab-panel.component";

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: "lens-tabs > tab-panels",
	template: "<ng-content></ng-content>"
})
export class TabPanelsComponent {
	@ContentChildren(TabPanelComponent) panels!: QueryList<TabPanelComponent>;
}
