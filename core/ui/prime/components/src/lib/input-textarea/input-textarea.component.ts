import { Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputBaseComponent } from "../input-base/input-base.component";

@Component({
	selector: "lens-input-textarea",
	templateUrl: "input-textarea.component.html",
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputTextareaComponent), multi: true }]
})
export class InputTextareaComponent extends InputBaseComponent {
	@Input() id!: string;
	@Input() placeholder?: string;
	@Input() cols?: number;
	@Input() rows?: number;
	@Input() style!: string;
	@Input() autoResize = false;

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
