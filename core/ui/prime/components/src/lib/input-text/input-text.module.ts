import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InputTextModule as PrimeInputTextModule } from "primeng/inputtext"
import { InputTextComponent } from "./input-text.component";

@NgModule({
    imports: [
        CommonModule,
        PrimeInputTextModule
    ],
    declarations: [
        InputTextComponent
    ],
    exports: [
        InputTextComponent
    ]
})
export class InputTextModule { }