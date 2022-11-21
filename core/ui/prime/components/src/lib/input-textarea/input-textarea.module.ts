import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextareaModule as PrimeInputTextareaModule } from "primeng/inputtextarea"
import { InputTextareaComponent } from "./input-textarea.component";

@NgModule({
    imports: [
        CommonModule,
        PrimeInputTextareaModule,
        FormsModule
    ],
    declarations: [
        InputTextareaComponent
    ],
    exports: [
        InputTextareaComponent
    ]
})
export class InputTextareaModule { }