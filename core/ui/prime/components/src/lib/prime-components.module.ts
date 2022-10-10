import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerModule } from './loading-indicator/loading-spinner.module';
import { IconModule } from './icon';
import { ButtonModule } from './button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { AppAbstractUiModule, DialogService as LensDialogService } from '@lens/app-abstract-ui';
import { DialogComponent } from './dialog/dialog.component';
import { PrimeDialogService } from './dialog';

@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    AppAbstractUiModule,
    LoadingSpinnerModule,
    IconModule,
    ButtonModule,
    DynamicDialogModule
  ],
  exports: [
    ButtonModule
  ],
  providers: [
    DialogService,
    { provide: LensDialogService, useExisting: PrimeDialogService}
  ]
})
export class PrimeComponentsModule {}
