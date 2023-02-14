import { Component } from "@angular/core";
import {
	ILayoutConfiguration,
	LayoutConfigurationService,
	MenuService
} from "@lens/app-abstract";

@Component({
	selector: "ui-left-sidebar",
	templateUrl: "./left-sidebar.component.html"
})
export class AppLeftSideBarComponent {
	layoutConfiguration: ILayoutConfiguration = {};
	currentRouteTitle?: string;

	constructor(
		public readonly layoutConfigurationService: LayoutConfigurationService,
		public readonly menuService: MenuService
	) { }
}
