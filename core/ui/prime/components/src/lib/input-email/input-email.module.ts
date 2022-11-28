import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { InputTextModule as PrimeInputTextModule } from "primeng/inputtext"
import { InputEmailComponent } from "./input-email.component";

@NgModule({
    imports: [
        CommonModule,
        PrimeInputTextModule,
        ReactiveFormsModule
    ],
    declarations: [
        InputEmailComponent
    ],
    exports: [
        InputEmailComponent
    ]
})
export class InputEmailModule { }