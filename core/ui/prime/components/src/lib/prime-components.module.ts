import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerModule } from './loading-indicator/loading-spinner.module';
import { IconModule } from './icon';
import { ButtonModule } from './button';
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
import { DialogModule } from './dialog';
import { InputChipsModule } from './input-chips';
import { InputCheckboxModule } from './input-checkbox';

@NgModule({
  imports: [
    AutoCompleteModule,
    ButtonModule,
    CommonModule,
    DropdownModule,
    IconModule,
    InputChipsModule,
    InputDateModule,
    InputEmailModule,
    InputTextModule,
    InputTextareaModule,
    LoadingSpinnerModule,
    PanelModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    DialogModule,
  ],
  exports: [
    AutoCompleteModule,
    ButtonModule,
    DropdownModule,
    IconModule,
    InputChipsModule,
    InputDateModule,
    InputEmailModule,
    InputTextModule,
    InputTextareaModule,
    InputCheckboxModule,
    LoadingSpinnerModule,
    PanelModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    DialogModule
  ]
})
export class PrimeComponentsModule {}
