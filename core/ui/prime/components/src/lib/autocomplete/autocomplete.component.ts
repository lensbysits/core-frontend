/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { KeyValuePair } from "@lens/app-abstract";

@Component({
	selector: "lens-autocomplete",
	templateUrl: "autocomplete.component.html",
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AutoCompleteComponent), multi: true }]
})
export class AutoCompleteComponent implements ControlValueAccessor {
	private _options: KeyValuePair<string | number, string>[] = [];

	@Input() public multiple = false;
	@Input() public forceSelection = true;
	@Input() public dropdown = true;
	@Input() public placeholder = "";
	@Input() public clearValueOnBlur = true;
	@Input() public required = false;
	@Input() public allowNewValues = false;
	@Input() public set options(value: KeyValuePair<string | number, string>[]) {
		this._options = value;
		this.filteredOptions = this._options;

		if (this.selectedKey) {
			this.tryResolveKey(this.selectedKey);
		}
	}

	@Output()
	public inputValueChanged: EventEmitter<KeyValuePair<string | number, string>> = new EventEmitter();

	@Output()
	public inputValuesChanged: EventEmitter<KeyValuePair<string | number, string>[]> = new EventEmitter();

	public disabled = false;
	public filteredOptions: KeyValuePair<string | number, string>[] = [];

	// never set the values fields directly from a component the inherits this component
	// use write value instead and make sure the this.options contains the key you add
	public values: KeyValuePair<string | number, string>[] = [];
	public value?: KeyValuePair<string | number, string>;

	private selectedKey: string | number | undefined;
	private selectedKeys: (string | number)[] = [];

	private onChange = (event: unknown) => {};
	private onTouched = (event: unknown) => {};

	public writeValue(keys: string | number | string[] | number[]): void {
		if (this.multiple) {
			this.selectedKeys = Array.isArray(keys) ? keys : [keys];
			this.selectedKeys.map(k => this.tryResolveKey(k));
		} else if (!Array.isArray(keys)) {
			this.selectedKey = keys;
			this.tryResolveKey(keys);
		}
	}

	public registerOnChange(fn: (event: unknown) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: (event: unknown) => void): void {
		this.onTouched = fn;
	}

	public setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	public onItemSelected(value: KeyValuePair<string | number, string>): void {
		if (this.itemAlreadySelected(value.key)) {
			return;
		}

		if (this.isNewValue(value)) {
			if (this.allowNewValues) {
				this._options.push(value);
			} else {
				return;
			}
		}

		if (this.multiple) {
			this.selectedKeys.push(value.key);
			this.values.push(value);
		} else if (!this.multiple) {
			this.selectedKey = value.key;
			this.value = value;
		}

		this.valueChanged();
	}

	public onItemUnselected(value: KeyValuePair<string | number, string>): void {
		if (this.multiple) {
			this.selectedKeys = this.selectedKeys.filter(k => k !== value.key);
			this.values = this.values.filter(v => v.key !== value.key);
		}

		this.valueChanged();
	}

	public onSearched(event: { originalEvent: Event; query: string }): void {
		this.filteredOptions = this._options?.filter(option => option.value.toLowerCase().indexOf(event.query.toLowerCase()) >= 0);
	}

	public onCleared(): void {
		this.value = undefined;
		this.selectedKey = undefined;
		this.values = [];
		this.selectedKeys = [];
		this.valueChanged();
	}

	protected valueChanged(): void {
		const result = this.multiple ? this.selectedKeys : this.selectedKey;
		this.onChange(result);
		this.onTouched(result);

		if (this.multiple) {
			this.inputValuesChanged.emit(this.values);
		} else {
			this.inputValueChanged.emit(this.value);
		}
	}

	private tryResolveKey(key: string | number | undefined) {
		const obj = this._options.find(o => o.key === key);
		if (!obj) {
			return;
		}

		if (this.multiple) {
			this.values.push(obj);
		} else {
			this.value = obj;
		}
	}

	private itemAlreadySelected(key: string | number) {
		return (this.multiple && this.selectedKeys.includes(key)) || this.selectedKey === key;
	}

	private isNewValue(value: KeyValuePair<string | number, string>): boolean {
		return this._options.findIndex(o => o.key === value.key) === -1;
	}
}
