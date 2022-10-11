import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: "lens-input-text", 
    templateUrl: "input-text.component.html",
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputTextComponent), multi: true }
    ]
})
export class InputTextComponent implements ControlValueAccessor {
    @Input() id!: string;
    @Input() placeholder?: string;
    @Input() icon!: string;
    @Input() spinIcon: boolean = false;
    @Input() iconAlign: "right" | "left" = "left";
    @Input() disabled: boolean = false;

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
        const value = ($event.target as HTMLInputElement).value;
        this.onChange(value)
    }
}