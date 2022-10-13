import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InputTextareaModule as PrimeInputTextareaModule } from "primeng/inputtextarea"
import { InputTextareaComponent } from "./input-textarea.component";

@NgModule({
    imports: [
        CommonModule,
        PrimeInputTextareaModule
    ],
    declarations: [
        InputTextareaComponent
    ],
    exports: [
        InputTextareaComponent
    ]
})
export class InputTextareaModule { }