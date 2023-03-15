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
import { LoadingSpinnerModule } from "./loading-indicator/loading-spinner.module";
import { PanelModule } from "./panel";
import { TabViewModule } from "./tab-view";
import { TableModule } from "./table";
import { ToastModule } from "./toast";
import { ToolbarModule } from "./toolbar";
import { TreeModule } from "./tree";

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
		TreeModule,
		TabViewModule,
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
		LanguageSelectorModule,
		TreeModule,
		TabViewModule
	]
})
export class PrimeComponentsModule {}
