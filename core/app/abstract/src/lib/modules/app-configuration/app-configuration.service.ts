import { Inject, Injectable, InjectionToken } from "@angular/core";

export const APP_CONFIGURATION = new InjectionToken("APP_CONFIGURATION");

@Injectable({
	providedIn: "root"
})
export class AppConfigurationService {
	private configuration: unknown;

	constructor(@Inject(APP_CONFIGURATION) configuration: unknown) {
		this.configuration = configuration;
	}

	getSettings(key?: string | Array<string>): unknown {
		if (!key || (Array.isArray(key) && !key[0])) {
			return this.configuration;
		}

		if (!Array.isArray(key)) {
			key = key.split(".");
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const result = key.reduce((acc: any, current: string) => acc && acc[current], this.configuration);

		return result;
	}
}
