import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "lens-button",
	templateUrl: "./button.component.html"
})
export class ButtonComponent {
	@Input() public label = "";
	@Input() public type: "primary" | "secondary" | "success" | "info" | "warning" | "danger" = "primary";
	@Input() public appearance: "default" | "raised" | "raised-text" | "rounded" | "rounded-outlined" | "rounded-text" | "text" | "raised-text" =
		"default";
	@Input() public size: "small" | "default" | "large" = "default";
	@Input() public icon = "";
	@Input() public disabled = false;
	@Input() public tooltip!: string;
	@Input() public tooltipPosition: "left" | "top" | "bottom" | "right" = "left";

	@Output() public clicked = new EventEmitter<MouseEvent>();

	public isRaised(): boolean {
		return this.appearance === "raised" || this.appearance === "raised-text";
	}

	public isRounded(): boolean {
		return this.appearance === "rounded" || this.appearance === "rounded-outlined" || this.appearance === "rounded-text";
	}

	public isText(): boolean {
		return this.appearance === "text" || this.appearance === "raised-text" || this.appearance === "rounded-text";
	}
}
