import { Component, OnInit, Optional } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
	ILayoutConfiguration,
	LayoutConfigurationService,
	SearchService
} from "@lens/app-abstract";
import { debounceTime, delay, distinctUntilChanged } from "rxjs";
import { AppMainComponent } from "../main/main.component";

@Component({
	selector: "ui-search-box",
	template: `
		<li
			class="nav-item search-box"
			*ngIf="layoutConfiguration.showSearch && searchService">
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
						[formControl]="queryField"
						class="form-control me-2"
						type="search"
						placeholder="Search"
						aria-label="Search"
						autofocus />
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
export class AppSearchBoxComponent implements OnInit {
	layoutConfiguration: ILayoutConfiguration = {};
	queryField = new FormControl();

	constructor(
		private readonly layoutConfigurationService: LayoutConfigurationService,
		public readonly appMain: AppMainComponent,
		@Optional() public readonly searchService: SearchService
	) {
		layoutConfigurationService.layoutConfiguration$.subscribe(
			(config) => (this.layoutConfiguration = config)
		);
	}

	// TODO: searchService is from @lens/app-abstract,  but needs to run an 'search' method is not yet implemented here? also being in the framework, I cannot import the specific searchService for the 'support' app! solution needed here?
	ngOnInit() {
		this.queryField.valueChanges
			.pipe(delay(200), debounceTime(300), distinctUntilChanged())
			.subscribe((searchTerm: string) => this.searchService.search(searchTerm));
	}
}
