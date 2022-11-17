import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerModule } from './loading-indicator/loading-spinner.module';
import { IconModule } from './icon';
import { ButtonModule } from './button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { AppAbstractUiModule, DialogService as LensDialogService } from '@lens/app-abstract-ui';
import { DialogComponent } from './dialog/dialog.component';
import { PrimeDialogService } from './dialog';
import { InputTextModule } from './input-text';
import { InputTextareaModule } from './input-textarea';
import { InputDateModule } from './input-date';
import { DropdownModule } from './dropdown';
import { TableModule } from './table';
import { ToolbarModule } from './toolbar';
import { ToastModule } from './toast';
import { InputEmailModule } from './input-email';
import { PanelModule } from './panel';
import { AutoCompleteModule } from './autocomplete';

@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    AppAbstractUiModule,
    AutoCompleteModule,
    ButtonModule,
    CommonModule,
    DynamicDialogModule,
    DropdownModule,
    IconModule,
    InputDateModule,
    InputEmailModule,
    InputTextModule,
    InputTextareaModule,
    LoadingSpinnerModule,
    PanelModule,
    TableModule,
    ToastModule,
    ToolbarModule
  ],
  exports: [
    AutoCompleteModule,
    ButtonModule,
    DropdownModule,
    IconModule,
    InputDateModule,
    InputEmailModule,
    InputTextModule,
    InputTextareaModule,
    LoadingSpinnerModule,
    PanelModule,
    TableModule,
    ToastModule,
    ToolbarModule
  ],
  providers: [
    DialogService,
    { provide: LensDialogService, useClass: PrimeDialogService}
  ]
})
export class PrimeComponentsModule {}
