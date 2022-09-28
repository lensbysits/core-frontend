import { Inject, Injectable, InjectionToken } from '@angular/core';

export const APP_CONFIGURATION = new InjectionToken("APP_CONFIGURATION");

@Injectable({
  providedIn: 'root'
})
export class AppConfigurationService {
  private configuration: any;

  constructor(@Inject(APP_CONFIGURATION) configuration: any) {
    this.configuration = configuration;
  }

  getSettings(key?: string | Array<string>): any {
    if (!key || (Array.isArray(key) && !key[0])) {
      return this.configuration;
    }

    if (!Array.isArray(key)) {
      key = key.split('.');
    }

    const result = key.reduce((acc: any, current: string) => acc && acc[current], this.configuration);

    return result;
  }
}