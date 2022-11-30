import { APP_INITIALIZER, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MenuService } from "@lens/app-abstract";
import { AppAbstractUiModule, AppComponent, ErrorHandlerService } from "@lens/app-abstract-ui";
import { PrimeComponentsModule } from "@lens/ui-prime-components";
import {
  MasterdataApiClientsModule,
  ErrorHandlerService as MyErrorHandlerService,
} from "./services";
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
  bootstrap: [AppComponent],
})
export class MasterdataModule {
  constructor(menuService: MenuService) {
    menuService.addMenuItems(menu);
  }
}
