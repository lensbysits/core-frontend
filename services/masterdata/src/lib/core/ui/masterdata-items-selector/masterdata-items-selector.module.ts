import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MultiSelectModule } from "@lens/ui-prime-components";
import { MasterdataItemsSelectorComponent } from "./masterdata-items-selector.component";

@NgModule({
	imports: [MultiSelectModule, FormsModule],
	declarations: [MasterdataItemsSelectorComponent],
	exports: [MasterdataItemsSelectorComponent]
})
export class MasterdataItemsSelectorModule {}
