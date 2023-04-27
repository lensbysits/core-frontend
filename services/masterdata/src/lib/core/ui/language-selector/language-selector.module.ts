import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "@lens/ui-prime-components";
import { LanguageSelectorComponent } from "./language-selector.component";

@NgModule({
	imports: [DropdownModule, FormsModule],
	declarations: [LanguageSelectorComponent],
	exports: [LanguageSelectorComponent]
})
export class LanguageSelectorModule {}
