import { Component, Input } from "@angular/core";

@Component({
    selector: "lens-panel",
    templateUrl: "panel.component.html"
})
export class PanelComponent {
    @Input() public header!: string;
    @Input() public collapsed = false;
}