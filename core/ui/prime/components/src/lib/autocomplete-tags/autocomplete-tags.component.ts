import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { AutoCompleteComponent } from "../autocomplete/autocomplete.component";

@Component({
  selector: "lens-autocomplete-tags",
  templateUrl: "autocomplete-tags.component.html",
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AutoCompleteTagsComponent), multi: true }
  ]
})
export class AutoCompleteTagsComponent extends AutoCompleteComponent implements OnInit {
  @Input() public allowAddNewTag = true; // allows adding of new tags when modeType=tags
  @Input() public separator = ""; // separator character to add an item when pressed in addition to the enter key.

  public ngOnInit(): void {
    this.filteredOptions = this.options;

    // multiple=true only works if you also set dropdown=false
    this.multiple = true;
    this.dropdown = false;
    this.forceSelection = false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  public override onItemSelected(value: any): void {
    this.valueChanged();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  public override onItemUnselected(value: any): void {
    this.valueChanged();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public override onSearched(event: any): void {
    this.filteredOptions = this.options?.filter(option => option.value.toLowerCase().indexOf(event.query.toLowerCase()) >= 0);

    if (!this.value) {
      return;
    }
    // don't show already used values in the suggestions list
    this.filteredOptions = this.filteredOptions?.filter(option => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return !this.values.find((item: any) => item.value.toLowerCase() === option.value.toLowerCase());
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, complexity
  public onKeyUp(event: any): void {
    if (!this.allowAddNewTag) {
      return;
    }
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (this.values && this.values.find((item: any) => item.value.toLowerCase() === _value.toLocaleLowerCase())) {
      // don't add a value already used
      return;
    }
    if (!this.values) {
      this.values = [];
    }
    this.values.push({ key: _value, value: _value });
    tokenInput.value = "";
    this.valueChanged();
  }

  private removeTrailingSeparator(str: string, separator: string, extraChars = "\\s") {
    return str.replace(new RegExp(`(^[${separator}${extraChars}]+)|([${separator}${extraChars}]+$)`, 'g'), "");
  }

  private removeMultipleSpaces(str: string) {
    return str.replace(new RegExp(`\\s{2,}`, 'g'), " ");
  }
}
