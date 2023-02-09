import { AfterViewInit, Component, Renderer2 } from "@angular/core";
import {
	ILayoutConfiguration,
	LayoutConfigurationService
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
	isMiniSidebar$ = this.windowService.isMiniSidebar$;
	sidebarType: "full" | "mini-sidebar" = "full";
	sidebarToggler = false;

	constructor(
		public readonly renderer: Renderer2,
		//private readonly menuService: MenuService,
		readonly layoutConfigurationService: LayoutConfigurationService,
		private readonly windowService: WindowService
	) {
		layoutConfigurationService.layoutConfiguration$.subscribe(
			(config) => (this.layoutConfiguration = config)
		);
	}

	ngAfterViewInit(): void {
		this.windowService.isMiniSidebar$.subscribe((data) => {
			this.sidebarType = data ? "mini-sidebar" : "full";
		});
	}

	onSidebarTogglerClick() {
		this.sidebarToggler = !this.sidebarToggler;
		this.sidebarType =
			this.sidebarType === "mini-sidebar" ? "full" : "mini-sidebar";
	}
}
