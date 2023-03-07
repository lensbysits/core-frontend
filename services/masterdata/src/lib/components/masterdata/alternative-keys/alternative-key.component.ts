import { Component, Input } from "@angular/core";

@Component({
	selector: "masterdata-alternative-key",
	templateUrl: "./alternative-key.component.html",
	styleUrls: ["./alternative-key.component.scss"]
})
export class MasterdataAlternativeKeyComponent {
	@Input() public showHeader = true;
	@Input() public showListTable = true;
	@Input() public showAddNewForm = true;

	@Input() public typeId = "";
	@Input() public masterdataId = "";
}
