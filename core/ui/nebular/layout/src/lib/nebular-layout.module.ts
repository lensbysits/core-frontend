import { ModuleWithProviders, NgModule } from '@angular/core';
import { NbThemeModule, NbLayoutModule, } from '@nebular/theme';
import { AppComponent, UnauthorizedComponent } from './components';
import { Router, RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from './components/full-layout/full-layout.component';
import { NebularComponentsModule } from '@lens/ui-nebular-components';


const components = [
  AppComponent, 
  UnauthorizedComponent,
  FullLayoutComponent
];

@NgModule({
  declarations: [...components ],
  imports: [
    NbLayoutModule,
    NbThemeModule.forRoot({ name: 'default' }),
    RouterModule.forRoot([]),
    NebularComponentsModule,
  ],
  exports: [NebularComponentsModule, NbThemeModule, ...components],
})
export class NebularLayoutModule {
  private static rootRoutes: Routes;

  static forRoot(routes: Routes): ModuleWithProviders<NebularLayoutModule> {
    this.rootRoutes = routes;

    return {
      ngModule: NebularLayoutModule,
      providers: [],
    };
  }

  static withSecureFullLayout(routes: Routes): ModuleWithProviders<NebularLayoutModule> {
    this.rootRoutes = [
      { 
        path: '', 
        component: FullLayoutComponent,
        // canActivate: [ AutoLoginAllRoutesGuard ],
        children: routes
      }
    ];

    return {
      ngModule: NebularLayoutModule,
      providers: [],
    };
  }

  constructor(router: Router) {
    router.resetConfig(NebularLayoutModule.rootRoutes);
  }
}

