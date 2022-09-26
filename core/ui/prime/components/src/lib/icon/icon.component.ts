import { Component, Input } from "@angular/core";

@Component({
    selector: "lens-icon",
    templateUrl: "icon.component.html"
})
export class IconComponent {
    @Input() public icon: string = "home";
}