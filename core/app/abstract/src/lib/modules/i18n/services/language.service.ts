import { Injectable, InjectionToken } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject, Subject } from "rxjs";
import { AppConfigurationService } from "../../app-configuration";
import { LanguageConfiguration } from "../models/language-configuration.model";

export const MULTILINGUAL_MODULES = new InjectionToken<string[]>("MULTILLINGUAL_MODULES");
export const LAZY_LOADED_MULTILINGUAL_MODULES = new InjectionToken<BehaviorSubject<string>>("LAZY_LOADED_MULTILINGUAL_MODULES");

@Injectable({
	providedIn: "root"
})
export class LanguageService {
	private translationsLoadedSubject = new Subject<void>();
	private translationsLoaded = false;

	constructor(private appConfigurationService: AppConfigurationService, private translateService: TranslateService) {}

	public onTranslationsLoaded(action: () => void) {
		// save the event handler to be triggered on lazy loaded modules
		// and execute them when the translations are already loaded
		this.translationsLoadedSubject.subscribe(action);
		if (this.translationsLoaded){
			action()
		}
	}

	public initLanguageConfiguration(): void {
		if (this.translationsLoaded) {
			this.reloadTranslations();
		} else {
			this.initTranslationService();
		}
	}

	private reloadTranslations() {
		this.translateService.reloadLang("en").subscribe(() =>{
			this.translationsLoadedSubject.next();

		});
	}

	private initTranslationService() {
		const config = this.appConfigurationService.getSettings<LanguageConfiguration>("languageConfiguration");
		this.translateService.addLangs(config.supportedLanguages);
		this.translateService.setDefaultLang(config.fallbackLanguage);
		const browserLang = this.translateService.getBrowserLang() ?? "";
		this.translateService
			.use(
				config.supportedLanguages.find(l => l.toLocaleLowerCase() === browserLang.toLocaleLowerCase()) !== undefined
					? browserLang
					: config.fallbackLanguage
			)
			.subscribe(() => {
				this.translationsLoaded = true;
				this.translationsLoadedSubject.next();
			});
	}
}
