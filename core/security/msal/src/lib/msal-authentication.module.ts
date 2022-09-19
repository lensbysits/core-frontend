import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import {
  InteractionType,
  IPublicClientApplication,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';
import {
  AuthenticationService,
  ClientConfiguration,
  GuardConfiguration,
  InterceptorConfiguration,
} from '@lens/security-abstract';
import { UserContextService } from '@lens/app-abstract';
import { MSalAuthenticationService, UserContextService as msalUserContextService } from './services';
import { AuthenticationRedirectComponent } from './components';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalGuard } from './guards/msal.guard';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;
function loggerCallback(logLevel: any, message: any, containsPii: any) {
  console.log(logLevel, message, containsPii);
}

@NgModule({
  declarations: [AuthenticationRedirectComponent],
  imports: [CommonModule, MsalModule],
  providers: [ MsalGuard ],
  exports: [MsalModule],
  bootstrap: []
})
export class MsalAuthenticationModule {
  static clientConfiguration: IPublicClientApplication;
  static guardConfiguration?: GuardConfiguration;
  static interceptorConfiguration?: InterceptorConfiguration;

  static bootstrap = [
    AuthenticationRedirectComponent 
  ];

  static forRoot(
    clientConfiguration: ClientConfiguration,
    guardConfiguration?: GuardConfiguration,
    interceptorConfiguration?: InterceptorConfiguration
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
          logLevel: LogLevel.Error,
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
          provide: UserContextService, 
          useClass: msalUserContextService },
        {
          provide: MSAL_INSTANCE,
          useFactory: (): IPublicClientApplication => {
            return this.clientConfiguration;
          },
        },
        {
          provide: MSAL_GUARD_CONFIG,
          useFactory: (): MsalGuardConfiguration | undefined => {
            if (!this.guardConfiguration) {
              return undefined;
            }

            return {
              interactionType: InteractionType.Redirect,
              authRequest: {
                scopes: this.guardConfiguration.scopes
              },
              loginFailedRoute: this.guardConfiguration.loginFailedRoute
            };
          }
        },
        {
          provide: MSAL_INTERCEPTOR_CONFIG,
          useFactory: (): MsalInterceptorConfiguration | undefined => {
            if (!this.interceptorConfiguration) {
              return undefined;
            }

            return {
              interactionType: InteractionType.Redirect,
              protectedResourceMap: this.interceptorConfiguration.protectedResources
            };
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
