import { Component, forwardRef, Input, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { Calendar } from "primeng/calendar";
import * as moment from "moment/moment";

@Component({
    selector: "lens-input-date", 
    templateUrl: "input-date.component.html",
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputDateComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => InputDateComponent), multi: true }
    ]
})
export class InputDateComponent implements ControlValueAccessor, Validator {
    @Input() public id!: string;
    @Input() public placeholder?: string;
    @Input() public disabled: boolean = false;

    private _mode: "time" | "date" | "datetime" = "date";
    @Input() public set mode(value: "time" | "date" | "datetime") {
        this.showButtonBar = value === "date" || value === "datetime";
        this.showTime = value === "datetime" || value === "time";
        this.timeOnly = value === "time";
        this._mode = value;
    }

    public get mode(): "time" | "date" | "datetime" {
        return this._mode;
    }

    public showButtonBar: boolean = false;
    public showTime: boolean = false;
    public timeOnly: boolean = false;

    @ViewChild("date", { read: Calendar, static: true }) private date!: Calendar;

    private _value: any;
    public set value(value: any) {
        this._value = value;
        this.onChange(value);
    }

    public get value() {
        return this._value;
    }

    private onChange = (event: any) => {};
    private onTouched = () => {};
    private onValidationChange = () => {};

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

    public onInputChanged($event: Event) {
        this.onChange(this.date.value);
        this.onValidationChange();
    }

    public onDateSelected($event: Event) {
        this.onChange($event);
    }

    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        let format = "D-M-YYYY";
        switch (this.mode) {
            case "time":
                format = "H:mm";
                break;
            case "datetime":
                format = "D-M-YYYY H:mm";
                break;
        }
        const date = moment(control.value, format, true); // TODO: localization!
        if (!date.isValid()) {
            return { invalidDate: "Invalid date entered" };
        }

        return null;
    }

    registerOnValidatorChange?(fn: () => void): void {
        this.onValidationChange = fn;
    }
}