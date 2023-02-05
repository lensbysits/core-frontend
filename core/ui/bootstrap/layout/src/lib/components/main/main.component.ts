import { Component, Renderer2 } from "@angular/core";
//import { MenuService } from "../menu/menu.service";
import { PrimeNGConfig } from "primeng/api";
import {
	ILayoutConfiguration,
	LayoutConfigurationService
} from "@lens/app-abstract";

@Component({
	selector: "ui-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.scss"]
})
export class AppMainComponent {
	rotateMenuButton = false;
	topbarMenuActive = false;
	overlayMenuActive = false;
	staticMenuDesktopInactive = false;
	staticMenuMobileActive = false;
	layoutMenuScroller: HTMLDivElement | undefined = undefined;
	menuClick = false;
	topbarItemClick = false;
	activeTopbarItem: any;
	menuHoverActive = false;
	configActive = false;
	configClick = false;

	layoutConfiguration: ILayoutConfiguration = {};

	constructor(
		public readonly renderer: Renderer2,
		//private readonly menuService: MenuService,
		readonly layoutConfigurationService: LayoutConfigurationService,
		private primengConfig: PrimeNGConfig
	) {
		layoutConfigurationService.layoutConfiguration$.subscribe(
			(config) => (this.layoutConfiguration = config)
		);
	}
}
