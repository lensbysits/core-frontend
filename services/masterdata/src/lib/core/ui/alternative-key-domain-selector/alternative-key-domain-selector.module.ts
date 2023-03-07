import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AutoCompleteModule } from "@lens/ui-prime-components";
import { MasterdataAlternativeKeyDomainSelectorComponent } from "./alternative-key-domain-selector.component";

@NgModule({
	imports: [AutoCompleteModule, FormsModule],
	declarations: [MasterdataAlternativeKeyDomainSelectorComponent],
	exports: [MasterdataAlternativeKeyDomainSelectorComponent]
})
export class MasterdataAlternativeKeyDomainSelectorModule {}
