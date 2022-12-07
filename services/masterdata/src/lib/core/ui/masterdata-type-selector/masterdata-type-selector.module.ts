import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AutoCompleteModule } from "@lens/ui-prime-components";
import { MasterdataTypeSelectorComponent } from "./masterdata-type-selector.component";

@NgModule({
  imports: [AutoCompleteModule, FormsModule],
  declarations: [MasterdataTypeSelectorComponent],
  exports: [MasterdataTypeSelectorComponent],
})
export class MasterdataTypeSelectorModule {}
