import { Component, forwardRef, Input, Optional } from "@angular/core";
import { ControlContainer, NG_VALUE_ACCESSOR } from "@angular/forms";
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
    @Input() autoResize: boolean;
    @Input() cols?: number;
    @Input() rows?: number;
    @Input() style!: string;

	constructor(@Optional() controlContainer: ControlContainer){
		super(controlContainer);
		this.autoResize = false;
	}
}