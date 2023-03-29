import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MultilingualModule } from "@lens/app-abstract";
import { AutoCompleteModule } from "./autocomplete";
import { AutoCompleteTagsModule } from "./autocomplete-tags";
import { ButtonModule } from "./button";
import { DialogModule } from "./dialog";
import { DropdownModule } from "./dropdown";
import { IconModule } from "./icon";
import { InputCheckboxModule } from "./input-checkbox";
import { InputChipsModule } from "./input-chips";
import { InputDateModule } from "./input-date";
import { InputEmailModule } from "./input-email";
import { InputTextModule } from "./input-text";
import { InputTextareaModule } from "./input-textarea";
import { LanguageSelectorModule } from "./language-selector";
import { ListboxModule } from "./listbox";
import { LoadingSpinnerModule } from "./loading-indicator/loading-spinner.module";
import { MultiSelectModule } from "./multiselect";
import { PanelModule } from "./panel";
import { TableModule } from "./table";
import { ToastModule } from "./toast";
import { ToolbarModule } from "./toolbar";
import { TreeModule } from "./tree";

const modules = [
	AutoCompleteModule,
	AutoCompleteTagsModule,
	ButtonModule,
	DialogModule,
	DropdownModule,
	IconModule,
	InputCheckboxModule,
	InputChipsModule,
	InputDateModule,
	InputEmailModule,
	InputTextModule,
	InputTextareaModule,
	LanguageSelectorModule,
	ListboxModule,
	LoadingSpinnerModule,
	MultiSelectModule,
	PanelModule,
	TableModule,
	ToastModule,
	ToolbarModule,
	TreeModule
];
@NgModule({
	imports: [...modules, CommonModule, MultilingualModule.forChild("prime")],
	exports: [...modules]
})
export class PrimeComponentsModule {}
