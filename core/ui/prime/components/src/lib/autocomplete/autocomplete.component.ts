/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputBaseComponent } from "../input-base/input-base.component";
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
	@Input() public set options(value: KeyValuePair<string | number, string>[]) {
		this._options = value;
		this.filteredOptions = this._options;

		if(this.selectedKey) {
			this.value = this._options.find(o => o.key === this.selectedKey)
		}
	}

	@Output()
	public inputValueChanged: EventEmitter<string | number> = new EventEmitter();
	
	public disabled = false;
	public filteredOptions: KeyValuePair<string | number, string>[] = [];
	
	public value?: KeyValuePair<string | number, string>;
	private selectedKey: string | number | undefined;


	private onChange = (event: any) => {};
	private onTouched = (event: any) => {};
	
	public writeValue(value: string|number): void {
		this.selectedKey = value;
		this.value = this.filteredOptions?.find(kv => kv.key === value);
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

	public onItemSelected(value?: KeyValuePair<string | number, string>): void {
		this.value = value;
		this.selectedKey = value?.key;
		this.valueChanged();
	}

	public onItemUnselected(value?: KeyValuePair<string | number, string>): void {
		this.valueChanged();
	}

	public onSearched(event: any): void {
		this.filteredOptions = this._options?.filter(option => option.value.toLowerCase().indexOf(event.query.toLowerCase()) >= 0);
	}

	public onCleared(): void {
		this.value = undefined;
		this.selectedKey = undefined;
		this.valueChanged();
	}

	public valueChanged(): void {
		this.onChange(this.selectedKey);
		this.onTouched(this.selectedKey);
		this.inputValueChanged.emit(this.selectedKey);
	}
}
