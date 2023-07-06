import { Component, Input } from "@angular/core";

@Component({
	selector: "lens-blockable-div",
	templateUrl: "blockable-div.component.html"
})
export class BlockableDivComponent {
	@Input() public blocked!: boolean;
	@Input() public icon = "pi-spinner";
	@Input() public size = 1;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Input() public class!: any;
}
