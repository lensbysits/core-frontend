import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterdataComponent } from './components/masterdata/masterdata.component';
import { RouterModule } from '@angular/router';
import { MenuService } from '@lens/app-abstract';
import { menu } from './app-menu';
import { masterdataRoutes } from './routes';
import { MdataDetailsComponent, MdataEditFormComponent, MdataListComponent, MdtDetailsComponent, MdtEditFormComponent, MdtListComponent } from './components';
import { AppAbstractUiModule } from '@lens/app-abstract-ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdtCrudHttpService } from './services/services';
import { HttpClientModule } from '@angular/common/http';
import { PrimeComponentsModule } from '@lens/ui-prime-components';

const components = [
  MasterdataComponent,
  MdataDetailsComponent,
  MdataEditFormComponent,
  MdataListComponent,
  MdtDetailsComponent,
  MdtListComponent,
  MdtEditFormComponent
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
  declarations: [
    ...components
  ],
  providers: [MdtCrudHttpService],
})
export class MasterdataModule {
  constructor(menuService: MenuService) {
    menuService.addMenuItems(menu);
  }
}
