import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppInfo } from './models/app-info.model';

export const APP_INFO = new InjectionToken<AppInfo>('AppInfo');

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: APP_INFO, useValue: new AppInfo() }
  ]
})
export class AppInfoModule { }
