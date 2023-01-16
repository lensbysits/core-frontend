import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NbIconModule, NbCardModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LensIconComponent } from './components/lens-icon/lens-icon.component';

const modules = [
  CommonModule,
  BrowserModule,
  BrowserAnimationsModule,
  NbCardModule,
  NbEvaIconsModule,
  NbIconModule,
];

const components = [
  LensIconComponent
]

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...modules, ...components]
})
export class NebularComponentsModule {}
