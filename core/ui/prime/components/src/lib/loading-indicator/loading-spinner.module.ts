import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingSpinnerComponent } from './loading-spinner.component';

@NgModule({
  imports: [
    CommonModule,
    ProgressSpinnerModule
  ],
  declarations: [
    LoadingSpinnerComponent
  ],
  exports: [
    LoadingSpinnerComponent
  ]
})
export class LoadingSpinnerModule {}
