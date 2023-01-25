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
import { AutoCompleteTagsModule } from './autocomplete-tags';
import { DialogModule } from './dialog';
import { InputChipsModule } from './input-chips';
import { LanguageSelectorModule } from './language-selector';
import { InputCheckboxModule } from './input-checkbox';
import { MultilingualModule } from '@lens/app-abstract';

@NgModule({
  imports: [
    AutoCompleteModule,
    AutoCompleteTagsModule,
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
    LanguageSelectorModule,
	MultilingualModule.forChild("prime")
  ],
  exports: [
    AutoCompleteModule,
    AutoCompleteTagsModule,
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
    DialogModule,
    LanguageSelectorModule
  ]
})
export class PrimeComponentsModule {}
