import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "lens-table > row-actions > action",
    template: ""
})
export class RowActionComponent {
    @Input() public icon!: string;
    @Input() public label!: string;
    @Output() public clicked = new EventEmitter<any>();
}