import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule, LayoutModule, UserContextModule, AppInfoModule, AppConfigurationModule, GlobalErrorHandlerModule } from './modules';

const libraryModules = [
  AppInfoModule,
  MenuModule,
  LayoutModule,
  UserContextModule,
  AppConfigurationModule,
  GlobalErrorHandlerModule
];

@NgModule({
  imports: [
    CommonModule,
    ...libraryModules
  ],
  exports: libraryModules
})
export class AppAbstractModule {}
