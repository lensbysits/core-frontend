import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalModule, MsalRedirectComponent, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import {
  IPublicClientApplication,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';
import {
  AuthenticationService,
  ClientConfiguration,
} from '@lens/security-abstract';
import { MSalAuthenticationService } from './services';
import { AuthenticationRedirectComponent } from './components';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;
function loggerCallback(logLevel: any, message: any, containsPii: any) {
  console.log(logLevel, message, containsPii);
}

@NgModule({
  declarations: [],
  imports: [CommonModule, MsalModule],
  exports: [MsalModule],
  bootstrap: []
})
export class MsalAuthenticationModule {
  static config?: IPublicClientApplication;

  static bootstrap = [
    AuthenticationRedirectComponent 
  ];

  static forRoot(
    clientConfiguration: ClientConfiguration
  ): ModuleWithProviders<MsalAuthenticationModule> {
    this.config = new PublicClientApplication({
      auth: { ...clientConfiguration },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE,
      },
      system: {
        loggerOptions: {
          loggerCallback,
          logLevel: LogLevel.Verbose,
          piiLoggingEnabled: true,
        },
      },
    });

    console.log(this.config);

    return {
      ngModule: MsalAuthenticationModule,
      providers: [
        {
          provide: AuthenticationService,
          useExisting: MSalAuthenticationService,
        },
        {
          provide: MSAL_INSTANCE,
          useFactory: () => {
            console.log(this.config);
            return this.config;
          },
        },
        MsalService,
      ],
    };
  }
}
