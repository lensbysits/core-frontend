import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AuthModule,
  LogLevel,
  OpenIdConfiguration,
  StsConfigLoader,
  StsConfigStaticLoader,
} from 'angular-auth-oidc-client';
import { UserContextService } from '@lens/app-abstract';
import { AuthenticationService, ClientConfiguration, GuardConfiguration, InterceptorConfiguration } from '@lens/security-abstract';
import { AuthenticationRedirectComponent } from './components';
import { 
  OAuthenticationService, 
  UserContextService as oAuthUserContextService 
} from './services';

const configFactory = () => {
  if (!OAuthenticationModule.clientConfiguration) {
    throw new Error('make sure to pass in a auth-config');
  }

  return new StsConfigStaticLoader(OAuthenticationModule.clientConfiguration);
};

@NgModule({
  declarations: [
    AuthenticationRedirectComponent
  ],
  imports: [
    CommonModule,
    AuthModule.forRoot({
      loader: {
        provide: StsConfigLoader,
        useFactory: configFactory,
      },
    }),
  ],
  exports: [AuthModule],
})
export class OAuthenticationModule {
  static clientConfiguration?: OpenIdConfiguration;
  static guardConfiguration?: GuardConfiguration;
  static interceptorConfiguration?: InterceptorConfiguration;

  static bootstrap = [
    AuthenticationRedirectComponent
  ];

  static forRoot(
    clientConfiguration: ClientConfiguration,
    guardConfiguration?: GuardConfiguration,
    interceptorConfiguration?: InterceptorConfiguration
  ): ModuleWithProviders<OAuthenticationModule> {
    this.clientConfiguration = {
      authority: clientConfiguration.authority,
      redirectUrl: clientConfiguration.redirectUri,
      postLogoutRedirectUri: clientConfiguration.postLogoutRedirectUri,
      clientId: clientConfiguration.clientId,
      scope: guardConfiguration?.scopes.join(' '),
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      logLevel: LogLevel.Debug
    };
    return {
      ngModule: OAuthenticationModule,
      providers: [
        { provide: AuthenticationService, useExisting: OAuthenticationService },
        { provide: UserContextService, useClass: oAuthUserContextService }
      ],
    };
  }
}
