import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AutoCompleteModule } from "@lens/ui-prime-components";
import { TagsSelectorComponent } from "./tags-selector.component";

@NgModule({
	imports: [AutoCompleteModule, FormsModule],
	declarations: [TagsSelectorComponent],
	exports: [TagsSelectorComponent]
})
export class TagsSelectorModule {}
