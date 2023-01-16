import { Component, forwardRef, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputBaseComponent } from "../input-base/input-base.component";

@Component({
    selector: "lens-input-text", 
    templateUrl: "input-text.component.html",
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputTextComponent), multi: true }
    ]
})
export class InputTextComponent extends InputBaseComponent {
    @Input() id!: string;
    @Input() placeholder?: string;
    @Input() icon!: string;
    @Input() spinIcon = false;
    @Input() iconAlign: "right" | "left" = "left";
}