import { Component, Input, Optional } from "@angular/core";
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, ValidationErrors, Validator } from "@angular/forms";

@Component({
    template: ""
})
export class InputBaseComponent implements ControlValueAccessor, Validator {
    @Input()
    public formControl?: FormControl;

    @Input()
    public formControlName?: string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get control(): FormControl<any> {
        if (this.formControl) {
            return this.formControl;
        }

        if (!this.controlContainer || !this.controlContainer.control || !this.formControlName) {
            throw "Either controlContainer, controlContainer.control or formControlName is empty. Please check your configuration.";
        }

        const control = this.controlContainer.control.get(this.formControlName);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return control as FormControl<any>;
    }

    constructor (
        @Optional() private readonly controlContainer: ControlContainer
    ) { }

    private _disabled?: string; 
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public value: any;

    public valueChanged(): void {
        this.onChange(this.value);
        this.onTouched(this.value);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    protected onChange = (event: any) => {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    protected onTouched = (event: any) => {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected onValidationChange = () => {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public writeValue(value: any): void {
        this.value = value;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return null;
    }

    public registerOnValidatorChange?(fn: () => void): void {
        this.onValidationChange = fn;
    }
}