import { Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputBaseComponent } from "../input-base/input-base.component";

@Component({
	selector: "lens-input-number",
	templateUrl: "input-number.component.html",
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputNumberComponent), multi: true }]
})
export class InputNumberComponent extends InputBaseComponent {
	@Input() public id!: string;
	@Input() public placeholder?: string;
	@Input() public icon!: string;
	@Input() public spinIcon = false;
	@Input() public iconAlign: "right" | "left" = "left";
	@Input() public mode = "decimal";
	@Input() public min = 0;
	@Input() public max!: number;
	@Input() public step = 1;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Output() public focusIn: EventEmitter<any> = new EventEmitter();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Output() public focusOut: EventEmitter<any> = new EventEmitter();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onFocusIn(event: any) {
		this.focusIn.emit(event.target.value);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onFocusOut(event: any) {
		this.focusOut.emit(event.target.value);
	}
}
