import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AutoCompleteTagsModule } from "@lens/ui-prime-components";
import { TagsSelectorComponent } from "./tags-selector.component";

@NgModule({
	imports: [AutoCompleteTagsModule, FormsModule],
	declarations: [TagsSelectorComponent],
	exports: [TagsSelectorComponent]
})
export class TagsSelectorModule {}
