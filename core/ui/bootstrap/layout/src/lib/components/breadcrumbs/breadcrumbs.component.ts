import { Component } from "@angular/core";
import {
	ILayoutConfiguration,
	LayoutConfigurationService
} from "@lens/app-abstract";

@Component({
	selector: "ui-breadcrumbs",
	templateUrl: "./breadcrumbs.component.html"
})
export class AppBreadcrumbsComponent {
	layoutConfiguration: ILayoutConfiguration = {};

	constructor(
		readonly layoutConfigurationService: LayoutConfigurationService
	) {}
}
