import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InputTextModule as PrimeInputTextModule } from "primeng/inputtext"
import { InputEmailComponent } from "./input-email.component";

@NgModule({
    imports: [
        CommonModule,
        PrimeInputTextModule
    ],
    declarations: [
        InputEmailComponent
    ],
    exports: [
        InputEmailComponent
    ]
})
export class InputEmailModule { }