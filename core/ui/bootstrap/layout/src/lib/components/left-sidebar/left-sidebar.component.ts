import { Component } from "@angular/core";
import {
	ILayoutConfiguration,
	LayoutConfigurationService
} from "@lens/app-abstract";

@Component({
	selector: "ui-left-sidebar",
	templateUrl: "./left-sidebar.component.html"
})
export class AppLeftSideBarComponent {
	assetsPath = "../assets/bootstrap/images/";
	layoutConfiguration: ILayoutConfiguration = {};

	constructor(
		readonly layoutConfigurationService: LayoutConfigurationService
	) {}
}
