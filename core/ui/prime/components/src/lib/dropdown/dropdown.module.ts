import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DropdownModule as PrimeDropdownModule } from "primeng/dropdown";
import { DropdownComponent } from "./dropdown.component";

@NgModule({
    imports: [
        FormsModule,
        PrimeDropdownModule
    ],
    declarations: [
        DropdownComponent
    ],
    exports: [
        DropdownComponent
    ]
})
export class DropdownModule { }