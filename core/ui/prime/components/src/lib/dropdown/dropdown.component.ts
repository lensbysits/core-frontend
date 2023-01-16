import { Component, forwardRef, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputBaseComponent } from "../input-base/input-base.component";

@Component({
    selector: "lens-dropdown",
    templateUrl: "dropdown.component.html",
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DropdownComponent), multi: true }
    ]
})
export class DropdownComponent extends InputBaseComponent {
    @Input() public id!: string;
    @Input() public placeholder?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Input() public options!: any[];
    @Input() public grouped = false;
    @Input() public editable = false;
    @Input() public optionValue = "value";
    @Input() public optionLabel = "label";
    @Input() public optionDisabled = "disabled";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public onDropdownChanged(event: any): void {
        this.value = event.value;
        this.valueChanged();
    }
}