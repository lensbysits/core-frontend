import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { AppConfigurationService } from "@lens/app-abstract";

import {
	API_BASE_URL,
	MasterdataAlternativeKeyService,
	MasterdataCrudHttpService,
	MasterdataRelatedItemsService,
	MasterdataRendererService
} from "./";

function apiBaseUrlFactory(appConfigurationService: AppConfigurationService): string {
	const result = appConfigurationService.getSettings<string>("api.baseUrl");
	return result;
}

@NgModule({
	imports: [CommonModule]
})
export class MasterdataServicesModule {
	public static forRoot(): ModuleWithProviders<MasterdataServicesModule> {
		return {
			ngModule: MasterdataServicesModule,
			providers: [
				MasterdataAlternativeKeyService,
				MasterdataCrudHttpService,
				MasterdataRelatedItemsService,
				MasterdataRendererService,
				{
					provide: API_BASE_URL,
					useFactory: apiBaseUrlFactory,
					deps: [AppConfigurationService]
				}
			]
		};
	}
}
