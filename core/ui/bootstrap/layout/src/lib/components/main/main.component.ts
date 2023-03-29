import { AfterViewInit, Component } from "@angular/core";
import {
	ILayoutConfiguration,
	LayoutConfigurationService,
	LayoutService
} from "@lens/app-abstract";
import { WindowService } from "../../services/window.service";

@Component({
	selector: "ui-main",
	templateUrl: "./main.component.html"
})
export class AppMainComponent implements AfterViewInit {
	assetsPath = "../assets/bootstrap/images/";
	layoutConfiguration: ILayoutConfiguration = {};
	topbarItemClick = false;
	activeTopbarItem: any;
	showMobileSidebar = false;
	showSearchbox = false;

	constructor(
		private readonly layoutConfigurationService: LayoutConfigurationService,
		private readonly windowService: WindowService,
		public readonly layoutService: LayoutService
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

	onLayoutClick() {
		if (!this.topbarItemClick) {
			this.activeTopbarItem = null;
		}

		this.topbarItemClick = false;
	}

	onTopbarItemClick(event: any, item: any): void {
		this.topbarItemClick = true;

		const itemId = item?.id ?? null;
		if (itemId === "mobileSidebarToggler") {
			this.showMobileSidebar = !this.showMobileSidebar;
		} else if (itemId === "sidebarToggler") {
			this.toggleSideBarType();
		}

		if (this.activeTopbarItem === item) {
			this.activeTopbarItem = null;
		} else {
			this.activeTopbarItem = item;
		}
		event.preventDefault();
	}

	onTopbarSubItemClick(event: any) {
		event.preventDefault();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onSearchboxItemClick(event: any, item: any) {
		this.showSearchbox = !this.showSearchbox;
		event.preventDefault();
	}

	private toggleSideBarType() {
		this.layoutService.SidebarType =
			this.layoutService.SidebarType === "mini-sidebar"
				? "full"
				: "mini-sidebar";
	}
}