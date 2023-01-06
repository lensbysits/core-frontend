import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'frontend-root',
  template: '<router-outlet></router-outlet>',
  providers: [TranslateService]
})
export class AppComponent {

    constructor(
		private translateService: TranslateService
	) {
		this.InitLanguageConfiguration();
	}

    private InitLanguageConfiguration() {
		//todo: should come from the app itself
        const supportedLanguages = ["En", "Nl"];
        const fallbackLanguage = "En";

        this.translateService.addLangs(supportedLanguages);
        this.translateService.setDefaultLang(fallbackLanguage);
        const browserLang = this.translateService.getBrowserLang() ?? "";
        this.translateService.use(supportedLanguages.indexOf(browserLang) !== -1 ? browserLang : fallbackLanguage);
    }
}
