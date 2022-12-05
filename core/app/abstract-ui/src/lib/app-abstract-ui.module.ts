import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentLoaderDirective } from './directives';
import { DefaultDialogService, DialogService, ErrorHandlerService } from './services';
import { ErrorDetailComponent } from './components/error-detail/error-detail.component';
import { RouterModule } from '@angular/router';
import { AppComponent } from './components';
import { HasClaimDirective } from './directives/has-claim.directive';
import { HasRoleDirective } from './directives/has-role.directive';
import { TemplateRendererComponent } from './components/template-renderer.component';

const components_directives = [
  AppComponent,
  ComponentLoaderDirective,
  TemplateRendererComponent,
  HasClaimDirective,
  HasRoleDirective
];

@NgModule({
  declarations: [...components_directives, ErrorDetailComponent],
  imports: [CommonModule, RouterModule],
  exports: [...components_directives, RouterModule],
  providers: [
    { provide: DialogService, useClass: DefaultDialogService },
    /**** 
      JST - 10-10-2022
      This APP_INITIALZER serves the purpose of instantiating an ErrorHandlerService at startup.
      Without this, the ErrorHandlerService may never be instantiated.
      This is subject to change as we learn more of the different scenario's errorhandling is used in.
    ****/
    {
      provide: APP_INITIALIZER,
      multi: true,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      useFactory: () => () => {},
      deps: [ErrorHandlerService],
    },
  ],
})
export class AppAbstractUiModule {}
