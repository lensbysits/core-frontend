/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Optional, Output } from "@angular/core";
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, ValidationErrors, Validator } from "@angular/forms";

@Component({
	template: ""
})
export class InputBaseComponent implements ControlValueAccessor, Validator {
	private _disabled?: string;
	private _required!: string;

	@Input()
	public formControl?: FormControl;
	@Input()
	public formControlName?: string;
	@Input() public set disabled(value: string | undefined | boolean) {
		this.isDisabled = value !== undefined;
		if (typeof value === "boolean" && !value) {
			this.isDisabled = false;
		}
		if (this.isDisabled) {
			this._disabled = "disabled";
		} else {
			this._disabled = undefined;
		}
	}
	public get disabled(): string | undefined | boolean {
		return this._disabled;
	}
	@Input() public set required(value: string) {
		this.isRequired = value !== undefined;
		this._required = value;
	}
	public get required(): string {
		return this._required;
	}

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
	}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	public setDisabledState?(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}

	public validate(control: AbstractControl<any, any>): ValidationErrors | null {
		return null;
	}

	public registerOnValidatorChange?(fn: () => void): void {
		this.onValidationChange = fn;
	}
}
