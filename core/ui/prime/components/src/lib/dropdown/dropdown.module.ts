import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownModule as PrimeDropdownModule } from "primeng/dropdown";
import { DropdownComponent } from "./dropdown.component";

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeDropdownModule],
	declarations: [DropdownComponent],
	exports: [DropdownComponent]
})
export class DropdownModule {}
