import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule, Routes } from '@angular/router';

import {StyleClassModule} from 'primeng/styleclass';
import { FullLayoutComponent } from './components';

const modules = [
  CommonModule,
  BrowserModule,
  BrowserAnimationsModule,
  StyleClassModule
];

const components = [
  FullLayoutComponent
];

@NgModule({
  declarations: [ ...components ],
  imports: [
    ...modules,
    RouterModule.forRoot([])
  ],
  exports: [...modules, ...components],
})
export class PrimeLayoutModule {
  private static rootRoutes: Routes;

  static forRoot(routes: Routes): ModuleWithProviders<PrimeLayoutModule> {
    this.rootRoutes = routes;

    return {
      ngModule: PrimeLayoutModule,
      providers: [],
    };
  }

  static withSecureFullLayout(routes: Routes): ModuleWithProviders<PrimeLayoutModule> {
    this.rootRoutes = [
      { 
        path: '', 
        component: FullLayoutComponent,
        // canActivate: [ AutoLoginAllRoutesGuard ],
        children: routes
      }
    ];

    return {
      ngModule: PrimeLayoutModule,
      providers: [],
    };
  }

  constructor(router: Router) {
    router.resetConfig(PrimeLayoutModule.rootRoutes);
  }
}