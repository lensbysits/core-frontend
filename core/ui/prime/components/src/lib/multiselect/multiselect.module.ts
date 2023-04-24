import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MultiSelectModule as PrimeMultiSelectModule } from "primeng/multiselect";
import { MultiSelectComponent } from "./multiselect.component";

@NgModule({
	imports: [CommonModule, FormsModule, PrimeMultiSelectModule],
	declarations: [MultiSelectComponent],
	exports: [MultiSelectComponent]
})
export class MultiSelectModule {}
