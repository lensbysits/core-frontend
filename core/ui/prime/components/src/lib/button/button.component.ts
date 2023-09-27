import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";

export type BtnType = "primary" | "secondary" | "success" | "info" | "warning" | "danger";

@Component({
	selector: "lens-button",
	templateUrl: "./button.component.html"
})
export class ButtonComponent implements OnInit, OnChanges {
	protected cssClass: string[] = [];

	@Input() public label = "";
	@Input() public type: BtnType = "primary";
	@Input() public appearance: "default" | "raised" | "raised-text" | "rounded" | "rounded-outlined" | "rounded-text" | "text" | "raised-text" =
		"default";
	@Input() public size: "small" | "default" | "large" = "default";
	@Input() public icon = "";
	@Input() public disabled = false;
	@Input() public tooltip!: string;
	@Input() public tooltipPosition: "left" | "top" | "bottom" | "right" = "left";
	@Input() public class!: string | string[];

	@Output() public clicked = new EventEmitter<MouseEvent>();

	public ngOnInit(): void {
		this.buildCssClass();
	}

	public ngOnChanges(): void {
		this.buildCssClass();
	}

	public isRaised(): boolean {
		return this.appearance === "raised" || this.appearance === "raised-text";
	}

	public isRounded(): boolean {
		return this.appearance === "rounded" || this.appearance === "rounded-outlined" || this.appearance === "rounded-text";
	}

	public isText(): boolean {
		return this.appearance === "text" || this.appearance === "raised-text" || this.appearance === "rounded-text";
	}

	private buildCssClass() {
		this.cssClass = [`p-button-${this.type}`];
		if (this.class) {
			this.cssClass = [...this.cssClass, ...(Array.isArray(this.class) ? this.class : this.class.split(" ").map(v => v.trim()))];
		}
	}
}
