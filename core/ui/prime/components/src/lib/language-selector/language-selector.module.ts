import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LanguageSelectorComponent } from "./language-selector.component";
import { DropdownModule as PrimeDropdownModule } from "primeng/dropdown";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PrimeDropdownModule
    ],
    declarations: [
        LanguageSelectorComponent
    ],
    exports: [
        LanguageSelectorComponent
    ]
})
export class LanguageSelectorModule { }