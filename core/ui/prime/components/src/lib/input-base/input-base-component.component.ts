import { Component, Input } from "@angular/core";
import { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from "@angular/forms";

@Component({
    template: ""
})
export class InputBaseComponent implements ControlValueAccessor, Validator {
    @Input() public disabled: boolean = false;

    private _value: any;
    public set value(value: any) {
        this._value = value;
        this.onChange(value);
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
        this.disabled = isDisabled;
    }

    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return null;
    }

    public registerOnValidatorChange?(fn: () => void): void {
        this.onValidationChange = fn;
    }
}