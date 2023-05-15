import { Component, forwardRef, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputBaseComponent } from "../input-base/input-base.component";

@Component({
	selector: "lens-input-checkbox",
	templateUrl: "input-checkbox.component.html",
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputCheckboxComponent), multi: true }]
})
export class InputCheckboxComponent extends InputBaseComponent {
	@Input() id!: string;
	@Input() label!: string;
	@Input() binary = true;
}
