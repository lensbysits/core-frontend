import { ModuleWithProviders, NgModule } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
	DEFAULT_LANGUAGE,
	MissingTranslationHandler,
	TranslateCompiler,
	TranslateDefaultParser,
	TranslateFakeCompiler,
	TranslateLoader,
	TranslateModule,
	TranslateParser,
	TranslateService,
	TranslateStore,
	USE_DEFAULT_LANG,
	USE_EXTEND,
	USE_STORE
} from "@ngx-translate/core";
import { LensMissingTranslationHandler } from "./missing-translation.handler";
import { CombinedFileLoader } from "./combined-translation-file.loader";
import { MULTILINGUAL_MODULES, LAZY_LOADED_MULTILINGUAL_MODULES } from "./services";
import { BehaviorSubject } from "rxjs";

@NgModule({
	exports: [TranslateModule]
})
export class MultilingualModule {
	private static lazyLoadedModuleSubject = new BehaviorSubject<string>("")
	static forRoot(): ModuleWithProviders<MultilingualModule> {
		const rootTranslationFileLocation = "/"; // app translation file is in the root of the i18n folder in the published assets

		return {
			ngModule: MultilingualModule,
			providers: [
				{ provide: MULTILINGUAL_MODULES, multi: true, useValue: rootTranslationFileLocation },
				{ provide: LAZY_LOADED_MULTILINGUAL_MODULES, useValue:  this.lazyLoadedModuleSubject},
				{ provide: TranslateLoader, useClass: CombinedFileLoader, deps: [HttpClient, MULTILINGUAL_MODULES, LAZY_LOADED_MULTILINGUAL_MODULES] },
				{ provide: TranslateCompiler, useClass: TranslateFakeCompiler },
				{ provide: TranslateParser, useClass: TranslateDefaultParser },
				{ provide: MissingTranslationHandler, useClass: LensMissingTranslationHandler },
				{ provide: USE_STORE, useValue: undefined },
				{ provide: USE_DEFAULT_LANG, useValue: undefined },
				{ provide: USE_EXTEND, useValue: undefined },
				{ provide: DEFAULT_LANGUAGE, useValue: undefined },
				TranslateService,
				TranslateStore
			]
		};
	}

	static forChild(multilingualModuleName: string): ModuleWithProviders<MultilingualModule> {
		this.lazyLoadedModuleSubject.next(multilingualModuleName);
		return {
			ngModule: MultilingualModule,
			providers: [{ provide: MULTILINGUAL_MODULES, multi: true, useValue: multilingualModuleName }]
		};
	}
}
