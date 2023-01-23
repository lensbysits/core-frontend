import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputBaseComponent } from "../input-base/input-base.component";

@Component({
  selector: "lens-autocomplete",
  templateUrl: "autocomplete.component.html",
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AutoCompleteComponent), multi: true }
  ]
})
export class AutoCompleteComponent extends InputBaseComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public options: { key: any, value: string }[] = [];
  @Input() public multiple = false;
  @Input() public forceSelection = true;
  @Input() public dropdown = true;
  @Input() public modeType: "default" | "tags" = "default";
  @Input() public separator = ""; // separator character to add an item when pressed in addition to the enter key.

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public filteredOptions: { key: any, value: string }[] = [];

  public ngOnInit(): void {
    this.filteredOptions = this.options;
    if (this.modeType === "tags") {
      // multiple=true only works if you also set dropdown=false
      this.multiple = true;
      this.dropdown = false;
      this.forceSelection = false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onItemSelected(value: any): void {
    if (this.modeType !== "tags") {
      // TODO: [fix issue]: updating 'value' when modeType=tags, generates an error!
      this.value = value;
    }
    this.valueChanged();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  public onItemUnselected(value: any): void {
    if (this.modeType !== "tags") {
      return;
    }
    this.valueChanged();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onSearched(event: any): void {
    this.filteredOptions = this.options?.filter(option => option.value.toLowerCase().indexOf(event.query.toLowerCase()) >= 0);
    if (this.modeType === "tags") {
      if (!this.value) {
        return;
      }
      // don't show already used values in the suggestions list
      this.filteredOptions = this.filteredOptions?.filter(option => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return !this.value.find((item: any) => item.value.toLowerCase() === option.value.toLowerCase());
      });
    }
  }

  public onCleared(): void {
    this.value = undefined;
    this.valueChanged();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  public onBlur(event: any): void {
    if (typeof this.value === "string") {
      this.value = undefined;
      this.valueChanged();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, complexity
  public onKeyUp(event: any): void {
    if (this.modeType !== "tags") {
      // TODO: implement this functionality for other mode types!
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
    if (this.value.find((item: any) => item.value.toLowerCase() === _value.toLocaleLowerCase())) {
      // don't add a value already used
      return;
    }
    this.value.push({ key: _value, value: _value });
    tokenInput.value = "";
  }

  private removeTrailingSeparator(str: string, separator: string, extraChars = "\\s") {
    return str.replace(new RegExp(`(^[${separator}${extraChars}]+)|([${separator}${extraChars}]+$)`, 'g'), "");
  }

  private removeMultipleSpaces(str: string) {
    return str.replace(new RegExp(`\\s{2,}`, 'g'), " ");
  }
}
