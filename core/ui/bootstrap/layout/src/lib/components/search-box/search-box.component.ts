import { Component } from "@angular/core";
import {
	ILayoutConfiguration,
	LayoutConfigurationService
} from "@lens/app-abstract";
import { AppMainComponent } from "../main/main.component";

@Component({
	selector: "ui-search-box",
	template: `
		<li
			class="nav-item search-box"
			*ngIf="layoutConfiguration.showSearch">
			<a
				#searchboxToggler
				id="searchboxToggler"
				class="nav-link waves-effect waves-dark"
				href="javascript:void(0)"
				(click)="appMain.onSearchboxItemClick($event, searchboxToggler)">
				<i class="mdi mdi-magnify fs-4"></i>
			</a>
			<ng-container *ngIf="appMain.showSearchbox">
				<form class="app-search position-absolute">
					<input
						type="text"
						class="form-control"
						placeholder="Search &amp; enter" />
					<a
						class="srh-btn"
						(click)="appMain.onSearchboxItemClick($event, searchboxToggler)">
						<i class="mdi mdi-window-close"></i>
					</a>
				</form>
			</ng-container>
		</li>
	`
})
export class AppSearchBoxComponent {
	layoutConfiguration: ILayoutConfiguration = {};

	constructor(
		private readonly layoutConfigurationService: LayoutConfigurationService,
		public readonly appMain: AppMainComponent
	) {
		layoutConfigurationService.layoutConfiguration$.subscribe(
			(config) => (this.layoutConfiguration = config)
		);
	}
}
