import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule, LayoutModule, UserContextModule, AppInfoModule, AppConfigurationModule } from './modules';
import { ErrorHandlerService } from './services';

const libraryModules = [
  AppInfoModule,
  MenuModule,
  LayoutModule,
  UserContextModule,
  AppConfigurationModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...libraryModules
  ],
  exports: libraryModules,
  providers: [    
    { provide: ErrorHandler, useExisting: ErrorHandlerService }
  ]
})
export class AppAbstractModule {}
