import { AfterViewInit, Component, Renderer2 } from "@angular/core";
import {
	ILayoutConfiguration,
	LayoutConfigurationService,
	LayoutService
} from "@lens/app-abstract";
import { WindowService } from "../../services/window.service";
//import { MenuService } from "../menu/menu.service";

@Component({
	selector: "ui-main",
	templateUrl: "./main.component.html"
})
export class AppMainComponent implements AfterViewInit {
	assetsPath = "../assets/bootstrap/images/";
	layoutConfiguration: ILayoutConfiguration = {};
	sidebarToggler = false;

	constructor(
		public readonly renderer: Renderer2,
		//private readonly menuService: MenuService,
		readonly layoutConfigurationService: LayoutConfigurationService,
		public readonly layoutService: LayoutService,
		private readonly windowService: WindowService
	) {
		layoutConfigurationService.layoutConfiguration$.subscribe(
			(config) => (this.layoutConfiguration = config)
		);
	}

	ngAfterViewInit(): void {
		this.windowService.isMiniSidebar$.subscribe((data) => {
			this.layoutService.SidebarType = data ? "mini-sidebar" : "full";
		});
	}
}
