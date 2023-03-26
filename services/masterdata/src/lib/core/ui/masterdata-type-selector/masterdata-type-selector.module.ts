import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "@lens/ui-prime-components";
import { MasterdataTypeSelectorComponent } from "./masterdata-type-selector.component";

@NgModule({
	imports: [DropdownModule, FormsModule],
	declarations: [MasterdataTypeSelectorComponent],
	exports: [MasterdataTypeSelectorComponent]
})
export class MasterdataTypeSelectorModule {}
