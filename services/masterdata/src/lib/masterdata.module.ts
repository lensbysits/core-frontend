import { APP_INITIALIZER, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MenuService } from "@lens/app-abstract";
import { AppAbstractUiModule, AppComponent, ErrorHandlerService } from "@lens/app-abstract-ui";
import { PrimeComponentsModule } from "@lens/ui-prime-components";
import { MasterdataTypeSelectorModule } from "./core/ui";
import {
  MasterdataApiClientsModule,
  ErrorHandlerService as MyErrorHandlerService,
} from "./core/services";
import { ErrorDetailsComponent } from "./components/error-details/error-details.component";

import { menu } from "./app-menu";
import { masterdataRoutes } from "./app-routes";
import {
  LoggerMessagesComponent,
  MasterdataDashboardComponent,
  MasterdatasDetailsComponent,
  MasterdatasEditFormComponent,
  MasterdatasListComponent,
  MasterdataTypeDetailsComponent,
  MasterdataTypeEditFormComponent,
  MasterdataTypeListComponent,
} from "./components";

const components = [
  ErrorDetailsComponent,
  LoggerMessagesComponent,
  MasterdataDashboardComponent,
  MasterdatasDetailsComponent,
  MasterdatasEditFormComponent,
  MasterdatasListComponent,
  MasterdataTypeDetailsComponent,
  MasterdataTypeListComponent,
  MasterdataTypeEditFormComponent,
];

@NgModule({
  imports: [
    CommonModule,
    AppAbstractUiModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PrimeComponentsModule,
    MasterdataTypeSelectorModule,
    RouterModule.forChild(masterdataRoutes),
    MasterdataApiClientsModule.forRoot(),
  ],
  declarations: [...components],
  providers: [
    {
      provide: APP_INITIALIZER,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      useFactory: () => () => {},
      deps: [],
      multi: true,
    },
    {
      provide: ErrorHandlerService,
      useClass: MyErrorHandlerService,
    },
  ],
  exports: [MasterdataTypeSelectorModule],
  bootstrap: [AppComponent],
})
export class MasterdataModule {
  constructor(menuService: MenuService) {
    menuService.addMenuItems(menu);
  }
}
