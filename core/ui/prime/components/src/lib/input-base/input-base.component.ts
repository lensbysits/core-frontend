import { Component, Input, Optional, ViewChild } from "@angular/core";
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, ValidationErrors, Validator } from "@angular/forms";

@Component({
    template: ""
})
export class InputBaseComponent implements ControlValueAccessor, Validator {
    @Input()
    public formControl?: FormControl;

    @Input()
    public formControlName?: string;

    get control(): FormControl<any> {
        const control = this.controlContainer?.control!.get(this.formControlName!)!;
        return this.formControl || control as FormControl<any>;
    }

    constructor (
        @Optional() private readonly controlContainer: ControlContainer
    ) { }

    private _disabled!: string; 
    @Input() public set disabled(value: string) {
        this.isDisabled = value !== undefined;
        this._disabled = value;
    }

    public get disabled(): string {
        return this._disabled;
    }

    public isDisabled = false;

    private _required!: string;
    @Input() public set required(value: string) {
        this.isRequired = value !== undefined;
        this._required = value;
    }

    public get required(): string {
        return this._required;
    }

    public isRequired = false;

    public value: any;

    public valueChanged(): void {
        this.onChange(this.value);
        this.onTouched(this.value);
    }

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