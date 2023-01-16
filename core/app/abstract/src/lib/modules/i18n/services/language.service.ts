import { Injectable, InjectionToken } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import { AppConfigurationService } from "../../app-configuration";
import { LanguageConfiguration } from "../models/language-configuration.model";

export const MULTILINGUAL_MODULES = new InjectionToken<string[]>('MULTILLINGUAL_MODULES');

@Injectable({
	providedIn: "root"
})
export class LanguageService {
	private translationsLoadedSubject = new Subject<void>();
	private translationsLoaded = false;

	constructor(private appConfigurationService: AppConfigurationService, private translateService: TranslateService) {}

	public onTranslationsLoaded(action: () => void) {
		if (!this.translationsLoaded) {
			// postpone action until translations are loaded
			this.translationsLoadedSubject.subscribe(action);
		} else {
			action();
		}
	}

	public initLanguageConfiguration(): void {
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
