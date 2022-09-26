import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule as PrimeNgButtonModule } from 'primeng/button';
import { ButtonComponent } from './button.component';

@NgModule({
  imports: [
    CommonModule,
    PrimeNgButtonModule
  ],
  declarations: [
    ButtonComponent
  ],
  exports: [
    ButtonComponent
  ]
})
export class ButtonModule {}
