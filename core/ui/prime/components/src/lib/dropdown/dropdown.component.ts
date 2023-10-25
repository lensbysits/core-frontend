import { Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputBaseComponent } from "../input-base/input-base.component";

@Component({
	selector: "lens-dropdown",
	templateUrl: "dropdown.component.html",
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DropdownComponent), multi: true }]
})
export class DropdownComponent extends InputBaseComponent {
	@Input() public isReactiveForm = false;
	@Input() public id!: string;
	@Input() public placeholder?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Input() public options!: any[];
	@Input() public grouped = false;
	@Input() public editable = false;
	@Input() public optionValue!: string;
	@Input() public optionLabel = "label";
	@Input() public optionDisabled = "disabled";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Input() public selectedOption!: any;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Output() public focusIn: EventEmitter<any> = new EventEmitter();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Output() public focusOut: EventEmitter<any> = new EventEmitter();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onDropdownChanged(event: any): void {
		this.value = event.value;
		this.valueChanged();
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onFocusIn(event: any) {
		this.focusIn.emit(event.target.value);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onFocusOut(event: any) {
		this.focusOut.emit(event.target.value);
	}
}
