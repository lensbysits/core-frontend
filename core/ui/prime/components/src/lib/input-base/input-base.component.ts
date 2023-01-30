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

	@Output()
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public inputValueChanged: EventEmitter<any> = new EventEmitter();

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

	@Input() public disabled = false;
    @Input() public required = false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public value: any;

    public valueChanged(): void {
        this.onChange(this.value);
        this.onTouched(this.value);
		this.inputValueChanged.emit(this.value);
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
        this.disabled = isDisabled;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    public validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return null;
    }

    public registerOnValidatorChange?(fn: () => void): void {
        this.onValidationChange = fn;
    }
}