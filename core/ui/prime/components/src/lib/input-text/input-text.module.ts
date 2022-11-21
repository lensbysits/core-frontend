import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule as PrimeInputTextModule } from "primeng/inputtext"
import { InputTextComponent } from "./input-text.component";

@NgModule({
    imports: [
        CommonModule,
        PrimeInputTextModule,
        FormsModule
    ],
    declarations: [
        InputTextComponent
    ],
    exports: [
        InputTextComponent
    ]
})
export class InputTextModule { }