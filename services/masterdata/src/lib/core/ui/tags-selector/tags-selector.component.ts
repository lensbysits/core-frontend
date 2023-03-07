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
	private _value?: KeyValuePair<string, string>;

	public options!: KeyValuePair<string, string>[];
	@Input() public disabled = false;
	@Input() public required = false;

	@Input() public set tags(value: string[]) {
		this.options = value?.map(item => ({
			key: item,
			value: item
		}));
	}

	@Input() public placeholder = "";
	@Input() public allowAddNewTag = true;
	@Output() public tagsChanged: EventEmitter<KeyValuePair<string, string>[]> = new EventEmitter();

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
		this.disabled = isDisabled;
	}

	public onTagsChanged(tags: KeyValuePair<string, string>[]) {
		this.tagsChanged.emit(tags);
	}
}
