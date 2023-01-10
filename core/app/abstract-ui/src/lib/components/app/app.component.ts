import { Component, OnInit } from '@angular/core';
import { AppConfigurationService } from '@lens/app-abstract';
import { TranslateService } from '@ngx-translate/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'frontend-root',
  template: '<router-outlet></router-outlet>',
  providers: [TranslateService]
})
export class AppComponent implements OnInit {
    constructor(
        private readonly appConfiguration: AppConfigurationService
    ) { }

    public ngOnInit(): void {
        this.appConfiguration.initLanguageConfiguration();
    }
}
