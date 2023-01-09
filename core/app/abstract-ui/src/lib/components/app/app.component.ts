import { Component } from '@angular/core';
import { AppConfigurationService } from '@lens/app-abstract';
import { TranslateService } from '@ngx-translate/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'frontend-root',
  template: '<router-outlet></router-outlet>',
  providers: [TranslateService]
})
export class AppComponent {
    constructor(appConfiguration: AppConfigurationService){
    appConfiguration.InitLanguageConfiguration() //question: Circular DI error when we do this in the appconfig service ctor
    }
}
