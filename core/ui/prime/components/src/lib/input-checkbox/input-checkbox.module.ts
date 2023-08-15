import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule as PrimeInputTextModule } from "primeng/inputtext";
import { InputCheckboxComponent } from "./input-checkbox.component";
@NgModule({
	imports: [CommonModule, PrimeInputTextModule, ReactiveFormsModule, FormsModule, CheckboxModule],
	declarations: [InputCheckboxComponent],
	exports: [InputCheckboxComponent]
})
export class InputCheckboxModule {}
