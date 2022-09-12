import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  NbThemeModule,
  NbLayoutModule,
  NbIconModule,
  NbCardModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppComponent, UnauthorizedComponent } from './components';
import { Router, RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from './components/full-layout/full-layout.component';
// import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';

const modules = [
  CommonModule,
  BrowserModule,
  BrowserAnimationsModule,
  NbLayoutModule,
  NbCardModule,
  NbEvaIconsModule,
  NbIconModule,
];

const components = [
  AppComponent, 
  UnauthorizedComponent,
  FullLayoutComponent
];

@NgModule({
  declarations: [...components ],
  imports: [
    ...modules,
    RouterModule.forRoot([]),
    NbThemeModule.forRoot({ name: 'default' }),
  ],
  exports: [...modules, NbThemeModule, ...components],
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
    console.log(this.rootRoutes);

    return {
      ngModule: NebularLayoutModule,
      providers: [],
    };
  }

  constructor(router: Router) {
    router.resetConfig(NebularLayoutModule.rootRoutes);
  }
}

