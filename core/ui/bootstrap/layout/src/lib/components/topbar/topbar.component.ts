import { Component } from "@angular/core";
import {
	ILayoutConfiguration,
	LayoutConfigurationService,
	LayoutService
} from "@lens/app-abstract";

@Component({
	selector: "ui-topbar",
	templateUrl: "./topbar.component.html"
})
export class AppTopBarComponent {
	assetsPath = "../assets/bootstrap/images/";
	layoutConfiguration: ILayoutConfiguration = {};

	constructor(
		readonly layoutConfigurationService: LayoutConfigurationService,
		readonly layoutService: LayoutService
	) {
	}

	onSidebarTogglerClick() {
		this.layoutService.SidebarType = this.layoutService.SidebarType === "mini-sidebar" ? "full" : "mini-sidebar"
	}
}
