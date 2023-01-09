import { HttpClient } from "@angular/common/http";
import { ModuleWithProviders } from "@angular/core";
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LensMissingTranslationHandler } from "./missingTranslationHandler";

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}

export class MultilingualModule {
	static forRoot(): ModuleWithProviders<TranslateModule> {
		return TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
            missingTranslationHandler: {provide: MissingTranslationHandler, useClass:LensMissingTranslationHandler}
		});
	}
}
