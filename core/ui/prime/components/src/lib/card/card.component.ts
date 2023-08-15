import { Component, Input } from "@angular/core";

@Component({
	selector: "lens-card",
	templateUrl: "card.component.html"
})
export class CardComponent {
	@Input() public header!: string;
	@Input() public subheader!: string;
	@Input() public styleClass!: string;
}
