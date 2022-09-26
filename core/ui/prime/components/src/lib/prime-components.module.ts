import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerModule } from './loading-indicator/loading-spinner.module';
import { IconModule } from './icon';
import { ButtonModule } from './button';

@NgModule({
  imports: [
    CommonModule,
    LoadingSpinnerModule,
    IconModule,
    ButtonModule
  ],
})
export class PrimeComponentsModule {}
