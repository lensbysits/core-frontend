import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { InputTextModule as PrimeInputTextModule } from "primeng/inputtext"
import { InputTextComponent } from "./input-text.component";

@NgModule({
    imports: [
        CommonModule,
        PrimeInputTextModule,
        ReactiveFormsModule
    ],
    declarations: [
        InputTextComponent
    ],
    exports: [
        InputTextComponent
    ]
})
export class InputTextModule { }