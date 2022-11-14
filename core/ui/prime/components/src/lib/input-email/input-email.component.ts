import { Component, forwardRef, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputBaseComponent } from "../input-base/input-base.component";

@Component({
    selector: "lens-input-email", 
    templateUrl: "input-email.component.html",
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputEmailComponent), multi: true }
    ]
})
export class InputEmailComponent extends InputBaseComponent {
    @Input() id!: string;
    @Input() placeholder?: string;
    @Input() icon!: string;
    @Input() spinIcon: boolean = false;
    @Input() iconAlign: "right" | "left" = "left";

    public onInputChanged($event: Event) {
        const value = ($event.target as HTMLInputElement).value;
        this.writeValue(value);
    }
}