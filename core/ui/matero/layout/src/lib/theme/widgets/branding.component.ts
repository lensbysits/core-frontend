import { Component } from '@angular/core';
import { AppConfigurationService } from '@lens/app-abstract';

@Component({
  selector: 'app-branding',
  template: `
    <a class="d-inline-block text-nowrap r-full text-reset" href="/">
      <img *ngIf="appLogo" src="{{appLogo}}" class="brand-logo align-middle m-2" alt="logo" />
      <span class="align-middle f-s-16 f-w-500 m-x-8">{{appName}}</span>
    </a>
  `,
  styles: [
    `
      .brand-logo {
        width: 30px;
        max-height: 30px;
      }
    `,
  ],
})
export class BrandingComponent {
  appName = 'set appInfo.name';
  appLogo: string;


  constructor(appConfigurationService: AppConfigurationService) {
    this.appName = appConfigurationService.getSettings("appInfo.name")
    this.appLogo = appConfigurationService.getSettings("appInfo.logo")
  }
}
