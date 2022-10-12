import { Component, forwardRef, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputBaseComponent } from "../input-base/input-base-component.component";

@Component({
    selector: "lens-input-textarea", 
    templateUrl: "input-textarea.component.html",
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputTextareaComponent), multi: true }
    ]
})
export class InputTextareaComponent extends InputBaseComponent {
    @Input() id!: string;
    @Input() placeholder?: string;

    public onInputChanged($event: Event) {
        const value = ($event.target as HTMLInputElement).value;
        this.onChange(value)
    }
}