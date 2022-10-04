import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerModule } from './loading-indicator/loading-spinner.module';
import { IconModule } from './icon';
import { ButtonModule } from './button';
import { DialogModule } from './dialog';

@NgModule({
  imports: [
    CommonModule,
    LoadingSpinnerModule,
    IconModule,
    ButtonModule,
    DialogModule
  ]
})
export class PrimeComponentsModule {}
