import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { InputNumberModule as PrimeInputNumberModule } from "primeng/inputnumber";
import { InputNumberComponent } from "./input-number.component";

@NgModule({
	imports: [CommonModule, PrimeInputNumberModule, ReactiveFormsModule],
	declarations: [InputNumberComponent],
	exports: [InputNumberComponent]
})
export class InputNumberModule {}
