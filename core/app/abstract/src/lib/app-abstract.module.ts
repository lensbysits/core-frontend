import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule, LayoutModule, UserContextModule, AppInfoModule, AppConfigurationModule } from './modules';

const libraryModules = [
  AppInfoModule,
  MenuModule,
  LayoutModule,
  UserContextModule,
  AppConfigurationModule
];

@NgModule({
  imports: [
    CommonModule,
    ...libraryModules
  ],
  exports: libraryModules
})
export class AppAbstractModule {}
