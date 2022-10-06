import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentLoaderDirective } from './directives';
import { DefaultDialogService, DialogService, ErrorHandlerService } from './services';
import { ErrorDetailComponent } from './components/error-detail/error-detail.component';
import { RouterModule } from '@angular/router';
import { AppComponent } from './components';

const components_directives = [AppComponent, ComponentLoaderDirective];

@NgModule({
  declarations: [...components_directives, ErrorDetailComponent],
  imports: [CommonModule, RouterModule],
  exports: [...components_directives, RouterModule],
  providers: [
    { provide: DialogService, useClass: DefaultDialogService },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => () => {},
      deps: [ErrorHandlerService],
    },
  ],
})
export class AppAbstractUiModule {}
