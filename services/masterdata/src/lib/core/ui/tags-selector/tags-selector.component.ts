import { Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { KeyValuePair } from "@lens/app-abstract";

@Component({
	selector: "masterdata-tags-selector",
	templateUrl: "tags-selector.component.html",
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TagsSelectorComponent),
			multi: true
		}
	]
})
export class TagsSelectorComponent implements ControlValueAccessor {
	private _values: KeyValuePair<string, string>[] = [];

	@Input() public disabled = false;
	@Input() public required = false;

	@Input() public set tags(value: string[]) {
		this._values = value?.map(item => new KeyValuePair<string, string>(item, item));
	}

	@Input() public placeholder = "";
	@Input() public allowAddNewTag = true;
	@Output() public tagsChanged: EventEmitter<KeyValuePair<string, string>[]> = new EventEmitter();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
	protected onChange = (event: any) => {};
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	protected onTouched = () => {};

	public set values(values: any) {
		//this._values.push(values.map(v => new KeyValuePair<string | number, string>(v, v)))
		this.onChange(values);
		this.onTouched();
	}

	public get values():any {
		return this._values;
	}

	public writeValue(obj: KeyValuePair<string, string>[]): void {
		this._values.push(...obj);
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

	public onTagsChanged(keys: KeyValuePair<string | number, string>[]) {
		const t = keys.map(k => new KeyValuePair<string, string>(k.key as string, k.value));
		this.values = t as any;
		this.tagsChanged.emit(this.values as any);
	}
}
