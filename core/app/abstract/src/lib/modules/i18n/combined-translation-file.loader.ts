import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { TranslateLoader } from "@ngx-translate/core";
import { BehaviorSubject, forkJoin, map, Observable } from "rxjs";
import { MULTILINGUAL_MODULES, LAZY_LOADED_MULTILINGUAL_MODULES } from "./services";

export class CombinedFileLoader extends TranslateLoader {
	private basePath = "assets/i18n";
	private multilingualModules: string[];

	constructor(
		private httpClient: HttpClient,
		@Inject(MULTILINGUAL_MODULES) eagerLoadedModules: string[],
		@Inject(LAZY_LOADED_MULTILINGUAL_MODULES) lazyLoadedModules: BehaviorSubject<string>
	) {
		super();
		this.multilingualModules = eagerLoadedModules;
		lazyLoadedModules.subscribe(moduleName => {
			if (!this.multilingualModules.includes(moduleName)) {
				this.multilingualModules.push(moduleName);
			}
		});
	}

	getTranslation(lang: string): Observable<unknown> {
		// get the translation file for each module that has called the MultilingualModule.forChild()
		const files = this.multilingualModules.map(m => {
			const modulePath = m !== "/" ? `/${m}/` : m;
			return this.httpClient.get(`${this.basePath}${modulePath}${lang}.json`);
		});

		return forkJoin(files).pipe(
			map(data => {
				const combinedTranslations = {};
				data.forEach(translationPart => {
					Object.assign(combinedTranslations, translationPart);
				});
				return combinedTranslations;
			})
		);
	}
}
