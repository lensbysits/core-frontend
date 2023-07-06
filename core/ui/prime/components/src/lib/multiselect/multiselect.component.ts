import { Component, forwardRef, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputBaseComponent } from "../input-base/input-base.component";

@Component({
	selector: "lens-multiselect",
	templateUrl: "multiselect.component.html",
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MultiSelectComponent), multi: true }]
})
export class MultiSelectComponent extends InputBaseComponent {
	@Input() public id!: string;
	@Input() public placeholder?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Input() public options: any[] = [];
	@Input() public optionValue = "value";
	@Input() public optionLabel = "label";
	@Input() public optionDisabled = "disabled";
	@Input() public readonly = false;
	@Input() public display: "default" | "chip" = "default";
	@Input() public showHeader = true;
	@Input() public selectedOptions: any[] = [];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onMultiSelectChanged(event: any): void {
		this.value = event.value;
		this.valueChanged();
	}
}
