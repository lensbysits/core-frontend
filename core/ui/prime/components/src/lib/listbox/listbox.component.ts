import { Component, forwardRef, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputBaseComponent } from "../input-base/input-base.component";

@Component({
	selector: "lens-listbox",
	templateUrl: "listbox.component.html",
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ListboxComponent), multi: true }]
})
export class ListboxComponent extends InputBaseComponent {
	@Input() public filterPlaceHolder = "";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Input() public options: any[] = [];
	@Input() public optionValue = "value";
	@Input() public optionLabel = "label";
	@Input() public optionDisabled = "disabled";
	@Input() public optionGroupLabel = "label";
	@Input() public optionGroupChildren = "items";
	@Input() public group = false;
	@Input() public readonly = false;
	@Input() public showToggleAll = true;
	@Input() public checkbox = true;
	@Input() public filter = true;
	@Input() public multiple = true;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Input() public listStyle: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Input() public listStyleClass: any;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onListboxChanged(event: any): void {
		this.value = event.value;
		this.valueChanged();
	}
}
