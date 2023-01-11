import { Injectable} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import { AppConfigurationService } from "../../app-configuration";
import { LanguageConfiguration } from "../models/language-configuration.model";

@Injectable({
	providedIn: "root"
})
export class LanguageService {
	public languagesLoaded = new Subject<void>();

	constructor(
        private appConfigurationService: AppConfigurationService,
        private translateService: TranslateService) {}

    public initLanguageConfiguration(): void {
		const config = this.appConfigurationService.getSettings<LanguageConfiguration>("languageConfiguration");
        this.translateService.addLangs(config.supportedLanguages);
        this.translateService.setDefaultLang(config.fallbackLanguage);
        const browserLang = this.translateService.getBrowserLang() ?? "";
        this.translateService.use(
            config.supportedLanguages.find(l => l.toLocaleLowerCase() === browserLang.toLocaleLowerCase()) !== undefined 
            ? browserLang 
            : config.fallbackLanguage).subscribe(() => this.languagesLoaded.next());
    }
}
