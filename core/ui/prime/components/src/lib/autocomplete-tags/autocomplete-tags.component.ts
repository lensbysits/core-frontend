import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { AutoCompleteComponent } from "../autocomplete/autocomplete.component";
import { KeyValuePair } from "@lens/app-abstract";

@Component({
	selector: "lens-autocomplete-tags",
	templateUrl: "autocomplete-tags.component.html",
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AutoCompleteTagsComponent), multi: true }]
})
export class AutoCompleteTagsComponent extends AutoCompleteComponent implements OnInit {
	@Input() public separator = ""; // separator character to add an item when pressed in addition to the enter key.

	public ngOnInit(): void {
		// tags is always multiple select
		this.multiple = true;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public override onSearched(event: any): void {
		this.filteredOptions = this._options?.filter(option => {
			let showValue = option.value.toLowerCase().indexOf(event.query.toLowerCase()) >= 0;

			// don't show already used values in the suggestions list
			showValue = showValue && !this.selectedKeys.includes(option.key);
			return showValue;
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onKeyUp(event: any): void {
		if (event.key.toLowerCase() !== "enter" && event.key !== this.separator) {
			return;
		}
		const tokenInput = event.target;
		if (!tokenInput.value) {
			return;
		}

		// clean the entered value
		let _value = tokenInput.value;
		_value = tokenInput.value.trim();
		_value = this.removeTrailingSeparator(tokenInput.value, this.separator);
		_value = this.removeMultipleSpaces(_value);
		tokenInput.value = _value;

		if (_value === "") {
			// don't add an empty value
			return;
		}
		if (_value.charAt(0) === this.separator) {
			// don't add a value which starts with the chosen separator character
			tokenInput.value = "";
			return;
		}

		this.onItemSelected(new KeyValuePair<string, string>(_value, _value));
		tokenInput.value = "";
	}

	private removeTrailingSeparator(str: string, separator: string, extraChars = "\\s") {
		return str.replace(new RegExp(`(^[${separator}${extraChars}]+)|([${separator}${extraChars}]+$)`, "g"), "");
	}

	private removeMultipleSpaces(str: string) {
		return str.replace(new RegExp(`\\s{2,}`, "g"), " ");
	}
}
