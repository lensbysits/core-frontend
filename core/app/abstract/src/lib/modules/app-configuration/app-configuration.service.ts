import { Inject, Injectable, InjectionToken } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LanguageConfiguration } from "./languageConfiguration";

export const APP_CONFIGURATION = new InjectionToken("APP_CONFIGURATION");

@Injectable({
	providedIn: "root"
})
export class AppConfigurationService {
	private configuration: unknown;

	constructor(
        @Inject(APP_CONFIGURATION) configuration: unknown,
        private translateService: TranslateService) {
		this.configuration = configuration;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getSettings<T>(key?: string | Array<string>): T {
		if (!key || (Array.isArray(key) && !key[0])) {
			return this.configuration as T;
		}

		if (!Array.isArray(key)) {
			key = key.split(".");
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const result = key.reduce((acc: any, current: string) => acc && acc[current], this.configuration);

		return result as T;
	}

    public initLanguageConfiguration() {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const config = this.getSettings<LanguageConfiguration>("languageConfiguration");
        this.translateService.addLangs(config.supportedLanguages);
        this.translateService.setDefaultLang(config.fallbackLanguage);
        const browserLang = this.translateService.getBrowserLang() ?? "";
        this.translateService.use(config.supportedLanguages.indexOf(browserLang) !== -1 ? browserLang : config.fallbackLanguage);
    }
}