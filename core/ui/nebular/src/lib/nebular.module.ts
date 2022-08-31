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
  UnauthorizedComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...modules,
    RouterModule.forRoot([]),
    NbThemeModule.forRoot({ name: 'default' })
  ],
  exports: [
    ...modules,
    NbThemeModule, 
    ...components
  ]
})
export class NebularModule {
  private static rootRoutes: Routes;

  static forRoot(routes: Routes): ModuleWithProviders<NebularModule> {
    this.rootRoutes = routes;

    return {
      ngModule: NebularModule,
      providers: []
    }
  }

  constructor(router: Router) {
    router.resetConfig(NebularModule.rootRoutes);
  }
}
