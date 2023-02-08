import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AutoCompleteModule as PrimeAutoCompleteModule } from "primeng/autocomplete";
import { AutoCompleteTagsComponent } from "./autocomplete-tags.component";

@NgModule({
    imports: [
        PrimeAutoCompleteModule,
        FormsModule
    ],
    declarations: [
        AutoCompleteTagsComponent
    ],
    exports: [
        AutoCompleteTagsComponent
    ]
})
export class AutoCompleteTagsModule { }
