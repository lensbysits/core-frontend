import { CommonModule } from "@angular/common";
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule, Routes } from "@angular/router";

//import { MenuService } from "./components/menu/menu.service";
import {
	AppAbstractModule,
	ILayoutConfiguration,
	LayoutConfigurationService
} from "@lens/app-abstract";
import { BootstrapComponentsModule } from "@lens/ui-bootstrap-components";
import { AppMainComponent } from "./components/main/main.component";

@NgModule({
	imports: [
		CommonModule,
		AppAbstractModule,
		RouterModule.forRoot([]),
		FormsModule,
		BootstrapComponentsModule
	],
	declarations: [AppMainComponent],
	providers: [], //MenuService
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
