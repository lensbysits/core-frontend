/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Optional, Output } from "@angular/core";
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, ValidationErrors, Validator } from "@angular/forms";

@Component({
	template: ""
})
export class InputBaseComponent implements ControlValueAccessor, Validator {
	@Input()
	public formControl?: FormControl;
	@Input()
	public formControlName?: string;
	@Input() 
	public disabled = false;
	@Input() 
	public required = false;

	@Output()
	public inputValueChanged: EventEmitter<any> = new EventEmitter();

	public get control(): FormControl<any> {
		if (this.formControl) {
			return this.formControl;
		}

		if (!this.controlContainer || !this.controlContainer.control || !this.formControlName) {
			throw "Either controlContainer, controlContainer.control or formControlName is empty. Please check your configuration.";
		}

		const control = this.controlContainer.control.get(this.formControlName);

		return control as FormControl<any>;
	}

	public isDisabled = false;
	public isRequired = false;
	public value: any;

	constructor(@Optional() private readonly controlContainer: ControlContainer) {}

	public valueChanged(): void {
		this.onValueChanged(this.value);
		this.onChange(this.value);
		this.onTouched(this.value);
		this.inputValueChanged.emit(this.value);
	}

	protected onValueChanged(value: any) {}

	protected onChange = (event: any) => {};
	protected onTouched = (event: any) => {};
	protected onValidationChange = () => {};

	public writeValue(value: any): void {
		this.value = value;
		// trigger the value changed handler, so the input control knows when a value is written and can execute specific logic
		this.onValueChanged(value);
	}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

    public setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

	public validate(control: AbstractControl<any, any>): ValidationErrors | null {
		return null;
	}

	public registerOnValidatorChange?(fn: () => void): void {
		this.onValidationChange = fn;
	}
}
