import { Component, ContentChild, Input, ViewChild } from "@angular/core";

@Component({
    selector: "lens-table > columns > column",
    template: ""
})
export class ColumnComponent {
    @Input() label!: string;
    @Input() field!: string;

    @ContentChild(ViewChild) public content?: ViewChild;
}