import { AfterViewInit, Component, EventEmitter, Output, Renderer2 } from "@angular/core";

@Component({
    selector: "lens-input-chips",
    templateUrl: "input-chips.component.html"
})
export class InputChipsComponent implements AfterViewInit {
    public values!: string[];

    @Output() search = new EventEmitter<string>();

    constructor (
        private readonly renderer: Renderer2
    ) { }

    public ngAfterViewInit(): void {
        const searchElement = document.getElementById("search") as HTMLInputElement;
        this.renderer.listen(searchElement, "input", () => this.search.emit(searchElement.value));
    }
}