import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule, LayoutModule, UserContextModule, AppInfoModule } from './modules';

const libraryModules = [
  AppInfoModule,
  MenuModule,
  LayoutModule,
  UserContextModule
];

@NgModule({
  imports: [
    CommonModule,
    ...libraryModules
  ],
  exports: libraryModules
})
export class AppAbstractModule {}
