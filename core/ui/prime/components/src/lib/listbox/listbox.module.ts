import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ListboxModule as PrimeListboxModule } from "primeng/listbox";
import { ListboxComponent } from "./listbox.component";

@NgModule({
	imports: [CommonModule, FormsModule, PrimeListboxModule],
	declarations: [ListboxComponent],
	exports: [ListboxComponent]
})
export class ListboxModule {}
