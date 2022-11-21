import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule as PrimeInputTextModule } from "primeng/inputtext"
import { InputEmailComponent } from "./input-email.component";

@NgModule({
    imports: [
        CommonModule,
        PrimeInputTextModule,
        FormsModule
    ],
    declarations: [
        InputEmailComponent
    ],
    exports: [
        InputEmailComponent
    ]
})
export class InputEmailModule { }