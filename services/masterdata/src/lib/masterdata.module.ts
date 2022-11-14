import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuService } from '@lens/app-abstract';
import { AppAbstractUiModule } from '@lens/app-abstract-ui';
import { PrimeComponentsModule } from '@lens/ui-prime-components';

import { menu } from './app-menu';
import { masterdataRoutes } from './app-routes';
import { MasterdataCrudHttpService } from './services/services';
import {
  MasterdataDashboardComponent,
  MasterdatasDetailsComponent,
  MasterdatasEditFormComponent,
  MasterdatasListComponent,
  MasterdataTypeDetailsComponent,
  MasterdataTypeEditFormComponent,
  MasterdataTypeListComponent,
} from './components';

const components = [
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
  ],
  declarations: [...components],
  providers: [MasterdataCrudHttpService],
})
export class MasterdataModule {
  constructor(menuService: MenuService) {
    menuService.addMenuItems(menu);
  }
}