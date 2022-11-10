import { Component, Input } from "@angular/core";

@Component({
    selector: "lens-table > columns > column",
    template: ""
})
export class ColumnComponent {
    @Input() label!: string;
    @Input() field!: string;
}