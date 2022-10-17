import { Component, Input } from "@angular/core";
import { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from "@angular/forms";

@Component({
    template: ""
})
export class InputBaseComponent implements ControlValueAccessor, Validator {
    private _disabled!: string; 
    @Input() public set disabled(value: string) {
        this.isDisabled = value !== undefined;
        this._disabled = value;
    }

    public get disabled(): string {
        return this._disabled;
    }

    public isDisabled: boolean = false;

    private _required!: string;
    @Input() public set required(value: string) {
        this.isRequired = value !== undefined;
        this._required = value;
    }

    public get required(): string {
        return this._required;
    }

    public isRequired: boolean = false;

    private _value: any;
    public set value(value: any) {
        this._value = value;
        this.onChange(value);
        this.onValidationChange();
    }

    public get value() {
        return this._value;
    }

    protected onChange = (event: any) => {};
    protected onTouched = () => {};
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