import { Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { KeyValuePair } from "@lens/app-abstract";
import { Masterdata } from "../../models";

@Component({
	selector: "masterdata-items-selector",
	templateUrl: "masterdata-items-selector.component.html",
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => MasterdataItemsSelectorComponent),
			multi: true
		}
	]
})
export class MasterdataItemsSelectorComponent implements ControlValueAccessor {
	private _value?: string[];

	public options!: KeyValuePair<string, string>[];
	@Input() public disabled = false;
	@Input() public placeholder = "";

	@Input() public set masterdataItems(value: Masterdata[]) {
		this.options = value?.map(item => ({
			key: item.id,
			value: item.name
		}));
	}

	@Output() public masterdataChanged: EventEmitter<string[]> = new EventEmitter();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
	protected onChange = (event: any) => {};
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	protected onTouched = () => {};

	public set value(value: string[] | undefined) {
		this._value = value;
		this.onChange(value);
		this.onTouched();
	}

	public get value(): string[] | undefined {
		return this._value;
	}

	public writeValue(obj: string[] | undefined): void {
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
		this.disabled = isDisabled;
	}

	public onMasterdataChanged(items: string[]) {
		this.masterdataChanged.emit(items);
	}
}
