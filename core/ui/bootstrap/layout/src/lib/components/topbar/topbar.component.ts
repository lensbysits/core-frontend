import { Component } from "@angular/core";
import {
	ILayoutConfiguration,
	LayoutConfigurationService
} from "@lens/app-abstract";

@Component({
	selector: "ui-topbar",
	templateUrl: "./topbar.component.html"
})
export class AppTopBarComponent {
	assetsPath = "../assets/bootstrap/images/";
	layoutConfiguration: ILayoutConfiguration = {};

	constructor(
		readonly layoutConfigurationService: LayoutConfigurationService
	) {}
}
