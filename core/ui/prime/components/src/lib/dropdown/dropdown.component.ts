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
    @Input() public options!: any[];
    @Input() public grouped: boolean = false;
    @Input() public editable: boolean = false;
    @Input() public optionValue: string = "value";
    @Input() public optionLabel: string = "label";
    @Input() public optionDisabled: string = "disabled";

    public onDropdownChanged(event: any): void {
        this.value = event.value;
        this.valueChanged();
    }
}