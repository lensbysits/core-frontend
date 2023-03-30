import { Injectable } from '@angular/core';
import { AppConfigurationService } from '@lens/app-abstract';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../../shared';
import { AppSettings, defaults, layoutDefaults, LayoutSettings } from '../settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private key = 'ng-matero-settings';

  private options: AppSettings;
  private layoutSettings: LayoutSettings;

  private readonly notify$ = new BehaviorSubject<Partial<AppSettings>>({});

  get notify() {
    return this.notify$.asObservable();
  }

  constructor(private store: LocalStorageService, private appConfigurationService: AppConfigurationService) {
    const storedOptions = this.store.get(this.key);
    this.options = Object.assign(defaults, storedOptions);
    this.layoutSettings = Object.assign(layoutDefaults, appConfigurationService.getSettings("layout"));
  }

  getOptions(): AppSettings {
    return this.options;
  }

  getLayoutSettings(): LayoutSettings {
    return this.layoutSettings;
  }

  setOptions(options: AppSettings) {
    this.options = Object.assign(defaults, options);
    this.store.set(this.key, this.options);
    this.notify$.next(this.options);
  }

  getLanguage() {
    return this.options.language;
  }

  setLanguage(lang: string) {
    this.options.language = lang;
    this.store.set(this.key, this.options);
    this.notify$.next(this.options);
  }

  reset() {
    this.store.remove(this.key);
  }
}
