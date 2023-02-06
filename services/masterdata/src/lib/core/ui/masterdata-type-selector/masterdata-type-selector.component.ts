import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { KeyValuePair } from "@lens/app-abstract";
import { MasterdataType } from "../../models";

@Component({
	selector: "masterdata-type-selector",
	templateUrl: "masterdata-type-selector.component.html",
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => MasterdataTypeSelectorComponent),
			multi: true
		}
	]
})
export class MasterdataTypeSelectorComponent implements ControlValueAccessor {
	@Input() public set masterdataTypes(value: MasterdataType[]) {
		this.options = value?.map(masterdataType => ({
			key: masterdataType.id,
			value: masterdataType.name
		}));
	}

	public options!: KeyValuePair<string, string>[];

	private _value?: KeyValuePair<string, string>;
	private _disabled!: string;

	public isDisabled = false;

	@Input() public set disabled(value: string) {
		this.isDisabled = value !== undefined;
		this._disabled = value;
	}

	public get disabled(): string {
		return this._disabled;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
	protected onChange = (event: any) => {};
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	protected onTouched = () => {};

	public set value(value: KeyValuePair<string, string> | undefined) {
		this._value = value;
		this.onChange(value);
		this.onTouched();
	}

	public get value(): KeyValuePair<string, string> | undefined {
		return this._value;
	}

	public writeValue(obj: KeyValuePair<string, string> | undefined): void {
		this._value = obj;
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
}
