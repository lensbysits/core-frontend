import { Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputBaseComponent } from "../input-base/input-base.component";

export interface IListboxOptionTextClick {
	originalEvent: Event;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	option: any;
}

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
	@Input() public isOptionTextLink = false;
	@Input() public showOptionTextCount = false;

	@Output() public optionTextClick = new EventEmitter<IListboxOptionTextClick>();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onListboxChanged(event: any): void {
		this.value = event.value;
		this.valueChanged();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
	public onListboxOptionClick(event: any): void {}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onOptionTextClick(event: Event, option: any) {
		this.optionTextClick.emit({ originalEvent: event, option });
	}
}
