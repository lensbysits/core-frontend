import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AutoCompleteModule as PrimeAutoCompleteModule } from "primeng/autocomplete";
import { AutoCompleteComponent } from "./autocomplete.component";

@NgModule({
    imports: [
        PrimeAutoCompleteModule,
        FormsModule
    ],
    declarations: [
        AutoCompleteComponent
    ],
    exports: [
        AutoCompleteComponent
    ]
})
export class AutoCompleteModule { }