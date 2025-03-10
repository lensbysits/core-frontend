import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SliderModule as PrimeSliderModule } from "primeng/slider";
import { InputSliderComponent } from "./input-slider.component";

@NgModule({
	imports: [CommonModule, PrimeSliderModule, ReactiveFormsModule],
	declarations: [InputSliderComponent],
	exports: [InputSliderComponent]
})
export class InputSliderModule {}
