import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ChipsModule } from "primeng/chips";
import { InputChipsComponent } from "./input-chips.component";

@NgModule({
    imports: [
        ChipsModule,
        FormsModule
    ],
    declarations: [
        InputChipsComponent
    ],
    exports: [
        InputChipsComponent
    ]
})
export class InputChipsModule { }