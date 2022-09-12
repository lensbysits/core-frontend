import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AuthModule,
  OpenIdConfiguration,
  StsConfigLoader,
  StsConfigStaticLoader,
} from 'angular-auth-oidc-client';
import { OAuthenticationService } from './services/oauthentication.service';
import { AuthenticationService } from '@lens/security-abstract';
import { AuthenticationRedirectComponent } from './components/authentication-redirect/authentication-redirect.component';

const configFactory = () => {
  console.log('passedConfig: ', OAuthenticationModule.config);
  if (!OAuthenticationModule.config) {
    throw new Error('make sure to pass in a auth-config');
  }

  return new StsConfigStaticLoader(OAuthenticationModule.config);
};

@NgModule({
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
  static config?: OpenIdConfiguration;

  static bootstrap = [
    AuthenticationRedirectComponent
  ];

  static forRoot(
    passedConfig: OpenIdConfiguration
  ): ModuleWithProviders<OAuthenticationModule> {
    this.config = passedConfig;
    return {
      ngModule: OAuthenticationModule,
      providers: [
        { provide: AuthenticationService, useExisting: OAuthenticationService },
      ],
    };
  }
}
