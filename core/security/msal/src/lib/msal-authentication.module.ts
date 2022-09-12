import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalGuard, MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
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
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
  static clientConfiguration?: IPublicClientApplication;
  static guardConfiguration?: MsalGuardConfiguration;
  static interceptorConfiguration?: MsalInterceptorConfiguration;

  static bootstrap = [
    AuthenticationRedirectComponent 
  ];

  static forRoot(
    clientConfiguration: ClientConfiguration,
    guardConfiguration?: MsalGuardConfiguration,
    interceptorConfiguration?: MsalInterceptorConfiguration
  ): ModuleWithProviders<MsalAuthenticationModule> {
    this.clientConfiguration = new PublicClientApplication({
      auth: clientConfiguration,
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
      }
    });
    this.guardConfiguration = guardConfiguration;
    this.interceptorConfiguration = interceptorConfiguration;

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
            return this.clientConfiguration;
          },
        },
        {
          provide: MSAL_GUARD_CONFIG,
          useFactory: () => {
            return this.guardConfiguration;
          }
        },
        {
          provide: MSAL_INTERCEPTOR_CONFIG,
          useFactory: () => {
            return this.interceptorConfiguration;
          },
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MsalInterceptor,
          multi: true
        },
        MsalGuard,
        MsalService
      ],
    };
  }
}
