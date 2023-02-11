import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import {
	ILayoutConfiguration,
	LayoutConfigurationService
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
	isMiniSidebar$ = this.windowService.isMiniSidebar$;
	sidebarType: "full" | "mini-sidebar" = "full";
	showMobileSidebar = false;
	showSearchbox = false;

	constructor(
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

	onLayoutClick() {
		if (!this.topbarItemClick) {
			this.activeTopbarItem = null;
		}

		this.topbarItemClick = false;
	}

	onTopbarItemClick(event: any, item: any): void {
		this.topbarItemClick = true;

		if (item?.id && item.id === "mobileSidebarToggler") {
			this.showMobileSidebar = !this.showMobileSidebar;
		} else {
			this.toggleSideBarType();
		}

		if (this.activeTopbarItem === item) {
			this.activeTopbarItem = null;
		} else {
			this.activeTopbarItem = item;
		}
		event.preventDefault();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onSearchboxItemClick(event: any, item: any) {
		this.showSearchbox = !this.showSearchbox;
		event.preventDefault();
	}

	private toggleSideBarType() {
		this.sidebarType =
			this.sidebarType === "mini-sidebar" ? "full" : "mini-sidebar";
	}
}
