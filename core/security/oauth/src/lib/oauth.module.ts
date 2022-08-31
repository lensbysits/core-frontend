import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule, OpenIdConfiguration, StsConfigLoader, StsConfigStaticLoader } from 'angular-auth-oidc-client';

const configFactory = () => { 
  console.log("passedConfig: ", OAuthModule.config); 
  if(!OAuthModule.config) {
    throw new Error("make sure to pass in a auth-config");
  }

  return new StsConfigStaticLoader(OAuthModule.config); 
};

@NgModule({
  imports: [
    CommonModule,
    AuthModule.forRoot({
      loader: {
        provide: StsConfigLoader,
        useFactory: configFactory
      }
    })
  ],
  exports: [
    AuthModule
  ]
})
export class OAuthModule {
  static config?: OpenIdConfiguration;

  static forRoot(passedConfig: OpenIdConfiguration): ModuleWithProviders<OAuthModule> {
    this.config = passedConfig;
    return {
      ngModule: OAuthModule,
      providers: [AuthModule]
    }
  }
}
