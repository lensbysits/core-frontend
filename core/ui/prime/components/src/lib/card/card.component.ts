import { Component, Input } from "@angular/core";

@Component({
	selector: "lens-card",
	templateUrl: "card.component.html",
	styleUrls: ["./card.component.scss"]
})
export class CardComponent {
	@Input() public header!: string;
	@Input() public title!: string;
	@Input() public subtitle!: string;
	@Input() public styleClass!: string;
}
