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
  @Input() public placeholder = "";
  @Input() public clearValueOnBlur = true;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public filteredOptions: { key: any, value: string }[] = [];

  public ngOnInit(): void {
    this.filteredOptions = this.options;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onItemSelected(value: any): void {
    this.value = value;
    this.valueChanged();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  public onItemUnselected(value: any): void {
    this.valueChanged();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onSearched(event: any): void {
    this.filteredOptions = this.options?.filter(option => option.value.toLowerCase().indexOf(event.query.toLowerCase()) >= 0);
  }

  public onCleared(): void {
    this.value = undefined;
    this.valueChanged();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  public onBlur(event: any): void {
    if (typeof this.value === "string") {
      if (this.clearValueOnBlur) {
        this.value = undefined;
      }
      this.valueChanged();
    }
  }
}
