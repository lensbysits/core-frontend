import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILayoutConfiguration } from '../models';

export const LAYOUT_CONFIGURATION = new InjectionToken<ILayoutConfiguration>('LayoutConfiguration');

@Injectable({
  providedIn: 'root'
})
export class LayoutConfigurationService {

  public readonly layoutConfiguration$ = new BehaviorSubject<ILayoutConfiguration>({});

  constructor(@Optional() @Inject(LAYOUT_CONFIGURATION) layoutConfiguration?: ILayoutConfiguration ) {
    if(layoutConfiguration)
    this.SetLayoutConfiguration(layoutConfiguration);
  }

  SetLayoutConfiguration(configuration: ILayoutConfiguration): void {
    this.layoutConfiguration$.next({ ...this.layoutConfiguration$.value, ...configuration});
  }
}
