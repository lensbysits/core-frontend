import { InjectionToken, ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthModule, AutoLoginAllRoutesGuard, LogLevel, OpenIdConfiguration, StsConfigLoader, StsConfigStaticLoader } from "angular-auth-oidc-client";
import { AppConfigurationService, UserContextService } from "@lens/app-abstract";
import { AuthenticationService, AuthGuard } from "@lens/security-abstract";
import { AuthenticationRedirectComponent } from "./components";
import { OAuthenticationService, UserContextService as oAuthUserContextService } from "./services";

const APP_OAUTH_CONFIGURATION = new InjectionToken("APP_OAUTH_CONFIGURATION");

const stsConfigLoaderFactory = (configuration: OpenIdConfiguration) => {
	if (!configuration) {
		throw new Error("make sure to pass in an auth-config");
	}

	return new StsConfigStaticLoader(configuration);
};

function appOAuthConfigurationFactory(appConfigurationService: AppConfigurationService): OpenIdConfiguration {
	return {
		authority: appConfigurationService.getSettings<string>("identity.client.auth.authority"),
		redirectUrl: appConfigurationService.getSettings<string>("identity.client.auth.redirectUri"),
		postLogoutRedirectUri: appConfigurationService.getSettings<string>("identity.client.auth.postLogoutRedirectUri"),
		clientId: appConfigurationService.getSettings<string>("identity.client.auth.clientId"),
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		scope: appConfigurationService.getSettings<any>("identity.guard.scopes").scopes.join(" "),
		responseType: "code",
		silentRenew: true,
		useRefreshToken: true,
		logLevel: LogLevel.Debug
	};
}

@NgModule({
	declarations: [AuthenticationRedirectComponent],
	imports: [
		CommonModule,
		AuthModule.forRoot({
			loader: {
				provide: StsConfigLoader,
				useFactory: stsConfigLoaderFactory,
				deps: [APP_OAUTH_CONFIGURATION]
			}
		})
	],
	exports: [AuthModule]
})
export class OAuthenticationModule {
	static bootstrap = [AuthenticationRedirectComponent];

	static forRoot(): ModuleWithProviders<OAuthenticationModule> {
		return {
			ngModule: OAuthenticationModule,
			providers: [
				{ provide: APP_OAUTH_CONFIGURATION, useFactory: appOAuthConfigurationFactory, deps: [AppConfigurationService] },
				{ provide: AuthenticationService, useExisting: OAuthenticationService },
				{ provide: UserContextService, useClass: oAuthUserContextService },
				{ provide: AuthGuard, useClass: AutoLoginAllRoutesGuard },
				AutoLoginAllRoutesGuard
			]
		};
	}
}
