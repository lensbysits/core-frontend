import { Injectable, Injector } from '@angular/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class TranslateLangService {
  constructor(
    private injector: Injector,
    private translate: TranslateService,
    private settings: SettingsService
  ) {}

  load() {
    return new Promise<void>(resolve => {
      const locationInitialized = this.injector.get(LOCATION_INITIALIZED, Promise.resolve());
      locationInitialized.then(() => {
        const browserLang = navigator.language;
        console.log(browserLang);
        const defaultLang = browserLang.match(/nl-NL|en-US|zh-CN|zh-TW/) ? browserLang : 'nl-NL';

        this.settings.setLanguage(defaultLang);
        this.translate.setDefaultLang(defaultLang);
        this.translate.use(defaultLang).subscribe(
          () => console.log(`Successfully initialized '${defaultLang}' language.'`),
          () => console.error(`Problem with '${defaultLang}' language initialization.'`),
          () => resolve()
        );
      });
    });
  }
}
