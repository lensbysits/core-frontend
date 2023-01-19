import { Component, forwardRef, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputBaseComponent } from "../input-base/input-base.component";

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
    @Input() cols?: number;
    @Input() rows?: number;
    @Input() style!: string;
    @Input() autoResize = false;
}