import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
	MsalGuard,
	MsalGuardConfiguration,
	MsalInterceptor,
	MsalInterceptorConfiguration,
	MsalModule,
	MsalService,
	MSAL_GUARD_CONFIG,
	MSAL_INSTANCE,
	MSAL_INTERCEPTOR_CONFIG
} from "@azure/msal-angular";
import { Configuration, IPublicClientApplication, LogLevel, PublicClientApplication } from "@azure/msal-browser";
import { AuthenticationModule, AuthenticationService, AuthGuard } from "@lens/security-abstract";
import { AppConfigurationService, UserContextService } from "@lens/app-abstract";
import { MSalAuthenticationService, UserContextService as msalUserContextService } from "./services";
import { AuthenticationRedirectComponent } from "./components";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

function msalInstanceFactory(appConfigurationService: AppConfigurationService): IPublicClientApplication {
	const clientConfiguration = appConfigurationService.getSettings<Configuration>("identity.client");
	if (clientConfiguration.cache && clientConfiguration.system?.loggerOptions) {
		clientConfiguration.cache.storeAuthStateInCookie = isIE;
		clientConfiguration.system.loggerOptions.loggerCallback = loggerCallback;
	}
	const result = new PublicClientApplication(clientConfiguration);

	return result;
}

function msalGuardConfigFactory(appConfigurationService: AppConfigurationService): MsalGuardConfiguration | undefined {
	const guardConfiguration = appConfigurationService.getSettings<MsalGuardConfiguration>("identity.guard");
	if (!guardConfiguration) {
		return undefined;
	}

	return guardConfiguration;
}

function msalInterceptorConfigFactory(appConfigurationService: AppConfigurationService): MsalInterceptorConfiguration | undefined {
	const interceptorConfiguration = appConfigurationService.getSettings<MsalInterceptorConfiguration>("identity.interceptor");
	if (!interceptorConfiguration) {
		return undefined;
	}

	interceptorConfiguration.protectedResourceMap = new Map<string, Array<string> | null>(
		interceptorConfiguration.protectedResourceMap as Map<string, Array<string>>
	);

	return interceptorConfiguration;
}

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
function loggerCallback(logLevel: LogLevel, message: string, containsPii: boolean) {
	// eslint-disable-next-line no-console, no-restricted-syntax
	console.debug(logLevel, message, containsPii);
}

@NgModule({
	declarations: [AuthenticationRedirectComponent],
	imports: [CommonModule, MsalModule, AuthenticationModule],
	providers: [MsalGuard],
	exports: [MsalModule],
	bootstrap: []
})
export class MsalAuthenticationModule {
	static bootstrap = [AuthenticationRedirectComponent];

	static forRoot(): ModuleWithProviders<MsalAuthenticationModule> {
		return {
			ngModule: MsalAuthenticationModule,
			providers: [
				{
					provide: AuthenticationService,
					useExisting: MSalAuthenticationService
				},
				{
					provide: UserContextService,
					useClass: msalUserContextService
				},
				{
					provide: MSAL_INSTANCE,
					useFactory: msalInstanceFactory,
					deps: [AppConfigurationService]
				},
				{
					provide: MSAL_GUARD_CONFIG,
					useFactory: msalGuardConfigFactory,
					deps: [AppConfigurationService]
				},
				{
					provide: MSAL_INTERCEPTOR_CONFIG,
					useFactory: msalInterceptorConfigFactory,
					deps: [AppConfigurationService]
				},
				{
					provide: HTTP_INTERCEPTORS,
					useClass: MsalInterceptor,
					multi: true
				},
				{ provide: AuthGuard, useClass: MsalGuard },
				MsalGuard,
				MsalService
			]
		};
	}
}
