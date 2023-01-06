import { HttpClient } from "@angular/common/http";
import { ModuleWithProviders } from "@angular/core";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}

export class MultilingualModule {
	static forRoot(): ModuleWithProviders<TranslateModule> {
		return TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		});
	}
}
