import { CommonModule } from "@angular/common";
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule, Routes } from "@angular/router";

import {
	AppAbstractModule,
	ILayoutConfiguration,
	LayoutConfigurationService
} from "@lens/app-abstract";
import { BootstrapComponentsModule } from "@lens/ui-bootstrap-components";
import { AppBreadcrumbsComponent } from "./components/breadcrumbs/breadcrumbs.component";
import { AppFooterComponent } from "./components/footer/footer.component";
import { AppLeftSideBarComponent } from "./components/left-sidebar/left-sidebar.component";
import { AppMainComponent } from "./components/main/main.component";
import { AppMenuComponent } from "./components/menu/menu.component";
import { AppMenuitemComponent } from "./components/menuitem/menuitem.component";
import { AppSearchBoxComponent } from "./components/search-box/search-box.component";
import { AppTopBarComponent } from "./components/topbar/topbar.component";
import { MenuService } from "./services/menu.service";
import { WindowService } from "./services/window.service";

@NgModule({
	imports: [
		CommonModule,
		AppAbstractModule,
		RouterModule.forRoot([]),
		FormsModule,
		BootstrapComponentsModule
	],
	declarations: [
		AppMainComponent,
		AppMenuComponent,
		AppMenuitemComponent,
		AppTopBarComponent,
		AppLeftSideBarComponent,
		AppBreadcrumbsComponent,
		AppFooterComponent,
		AppSearchBoxComponent
	],
	providers: [MenuService, WindowService],
	exports: [AppMainComponent, RouterModule, AppAbstractModule]
})
export class BootstrapLayoutModule {
	private static rootRoutes: Routes;

	static forRoot(
		configuration: ILayoutConfiguration
	): ModuleWithProviders<BootstrapLayoutModule> {
		return {
			ngModule: BootstrapLayoutModule,
			providers: [
				{
					provide: APP_INITIALIZER,
					useFactory: (layout: LayoutConfigurationService) => () =>
						layout.SetLayoutConfiguration(configuration),
					deps: [LayoutConfigurationService],
					multi: true
				}
			]
		};
	}

	static withRoutes(
		routes: Routes,
		configuration: ILayoutConfiguration
	): ModuleWithProviders<BootstrapLayoutModule> {
		this.rootRoutes = routes;

		return {
			ngModule: BootstrapLayoutModule,
			providers: [
				{
					provide: APP_INITIALIZER,
					useFactory: (layout: LayoutConfigurationService) => () =>
						layout.SetLayoutConfiguration(configuration),
					deps: [LayoutConfigurationService],
					multi: true
				}
			]
		};
	}

	constructor(router: Router) {
		if (BootstrapLayoutModule.rootRoutes) {
			router.resetConfig(BootstrapLayoutModule.rootRoutes);
		}
	}
}
