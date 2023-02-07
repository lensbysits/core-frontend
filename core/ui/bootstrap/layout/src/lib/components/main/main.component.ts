import { Component, Renderer2 } from "@angular/core";
import {
	ILayoutConfiguration,
	LayoutConfigurationService
} from "@lens/app-abstract";
//import { MenuService } from "../menu/menu.service";

@Component({
	selector: "ui-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.scss"]
})
export class AppMainComponent {
	layoutConfiguration: ILayoutConfiguration = {};

	constructor(
		public readonly renderer: Renderer2,
		//private readonly menuService: MenuService,
		readonly layoutConfigurationService: LayoutConfigurationService
	) {
		layoutConfigurationService.layoutConfiguration$.subscribe(
			(config) => (this.layoutConfiguration = config)
		);
	}
}
