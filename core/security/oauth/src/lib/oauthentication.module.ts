import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AuthModule,
  OpenIdConfiguration,
  StsConfigLoader,
  StsConfigStaticLoader,
} from 'angular-auth-oidc-client';
import { AuthenticationService } from '@lens/security-abstract';
import { OAuthenticationService } from './services';
import { AuthenticationRedirectComponent } from './components';

const configFactory = () => {
  if (!OAuthenticationModule.config) {
    throw new Error('make sure to pass in a auth-config');
  }

  return new StsConfigStaticLoader(OAuthenticationModule.config);
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
