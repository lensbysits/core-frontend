import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { AppConfigurationService } from "@lens/app-abstract";

import { API_BASE_URL, MasterdataCrudHttpService } from "./";

function apiBaseUrlFactory(appConfigurationService: AppConfigurationService): string {
	const result = appConfigurationService.getSettings<string>("api.baseUrl");
	return result;
}

@NgModule({
	imports: [CommonModule, HttpClientModule]
})
export class MasterdataApiClientsModule {
	public static forRoot(): ModuleWithProviders<MasterdataApiClientsModule> {
		return {
			ngModule: MasterdataApiClientsModule,
			providers: [
				MasterdataCrudHttpService,
				{
					provide: API_BASE_URL,
					useFactory: apiBaseUrlFactory,
					deps: [AppConfigurationService]
				}
			]
		};
	}
}
