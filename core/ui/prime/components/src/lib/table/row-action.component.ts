import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "lens-table > row-actions > action",
    template: ""
})
export class RowActionComponent {
    @Input() public id?: string;
    @Input() public icon!: string;
    @Input() public label!: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Output() public clicked = new EventEmitter<any>();
}