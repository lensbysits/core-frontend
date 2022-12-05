import { AfterViewInit, Component, EventEmitter, forwardRef, Input, Output, Renderer2 } from "@angular/core";
import { ControlContainer, NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputBaseComponent } from "../input-base/input-base.component";

@Component({
    selector: "lens-input-chips",
    templateUrl: "input-chips.component.html",
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputChipsComponent), multi: true }
    ]
})
export class InputChipsComponent extends InputBaseComponent implements AfterViewInit {
    @Input() public fieldLabel?: string;

    @Output() search = new EventEmitter<string>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Output() remove = new EventEmitter<any>();

    constructor (
        controlContainer: ControlContainer,
        private readonly renderer: Renderer2
    ) {
        super(controlContainer);
    }

    public ngAfterViewInit(): void {
        const searchElement = document.getElementById("search") as HTMLInputElement;
        this.renderer.listen(searchElement, "input", () => this.search.emit(searchElement.value));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public onRemoveChip(event: any) {
        this.remove.emit(event.value);
    }
}