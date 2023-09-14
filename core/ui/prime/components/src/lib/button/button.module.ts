import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule as PrimeNgButtonModule } from "primeng/button";
import { TooltipModule as PrimeTooltipModule } from "primeng/tooltip";
import { ButtonComponent } from "./button.component";

@NgModule({
	imports: [CommonModule, PrimeNgButtonModule, PrimeTooltipModule],
	declarations: [ButtonComponent],
	exports: [ButtonComponent]
})
export class ButtonModule {}
