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
	private config?: LanguageConfiguration;
	private browserLang = '';

	public get rtlStylesheetLocation(): string | undefined {
		return this.config?.rtlStylesheetLocation;
	}

	constructor(private appConfigurationService: AppConfigurationService, private translateService: TranslateService) {}

	public onTranslationsLoaded(action: () => void) {
		// Lazy loaded modules loading extra resource files after the translation service is initialized
		// We need to notify the subscribers when the translations for lazy loaded modules are loaded
		// otherwise we will miss a lot of translations resulting in a broken UI
		this.translationsLoadedSubject.subscribe(action);
		if (this.translationsLoaded) {
			action();
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
		this.translationsLoaded = false;
		this.translateService.reloadLang("en").subscribe(() => {
			this.notifyListeners();
			this.notifyPipesAndDirectives();
		});
	}
	
	private notifyPipesAndDirectives() {
		// we need to switch and then switch back to the current language
		// in order to notify the pipes and directives that the translations have changed
		// otherwise the rendered translated HTML won't be updated
		this.translateService.use("en").subscribe(() => {
			this.translateService.use(this.browserLang);
		});
	}

	private initTranslationService() {
		this.config = this.appConfigurationService.getSettings<LanguageConfiguration>("languageConfiguration");
		this.translateService.addLangs(this.config.supportedLanguages);
		this.translateService.setDefaultLang(this.config.fallbackLanguage);
		this.browserLang = this.translateService.getBrowserLang() ?? "";
		this.translateService
			.use(
				this.config.supportedLanguages.find(l => l.toLocaleLowerCase() === this.browserLang.toLocaleLowerCase()) !== undefined
					? this.browserLang
					: this.config.fallbackLanguage
			)
			.subscribe(() => {
				this.notifyListeners();
			});
	}

	private notifyListeners() {
		this.translationsLoaded = true;
		this.translationsLoadedSubject.next();
	}
}