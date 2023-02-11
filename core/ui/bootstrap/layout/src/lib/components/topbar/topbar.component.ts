import { Component } from "@angular/core";
import {
	ILayoutConfiguration,
	LayoutConfigurationService
} from "@lens/app-abstract";
import { AppMainComponent } from "../main/main.component";

@Component({
	selector: "ui-topbar",
	templateUrl: "./topbar.component.html"
})
export class AppTopBarComponent {
	layoutConfiguration: ILayoutConfiguration = {};

	constructor(
		public readonly layoutConfigurationService: LayoutConfigurationService,
		public readonly appMain: AppMainComponent
	) {
		layoutConfigurationService.layoutConfiguration$.subscribe(
			(config) => (this.layoutConfiguration = config)
		);
	}
}
