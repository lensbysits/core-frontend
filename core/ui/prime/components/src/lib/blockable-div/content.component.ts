import { Component, ElementRef } from "@angular/core";
import { BlockableUI } from "primeng/api";

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: "lens-blockable-div > content",
	template: `
		<ng-content></ng-content>
	`
})
export class ContentComponent implements BlockableUI {
	constructor(private el: ElementRef) {}

	getBlockableElement(): HTMLElement {
		return this.el.nativeElement.children[0];
	}
}
