import { Component, Input } from "@angular/core";

@Component({
	selector: "masterdata-alternative-key",
	templateUrl: "./alternative-key.component.html",
	styleUrls: ["./alternative-key.component.scss"]
})
export class MasterdataAlternativeKeyComponent {
	@Input() public showHeader = true;
	@Input() public showAddNewForm = true;
	@Input() public showListTable: false | true | "view" = true; // if view => we only display the rows, without any row actions!

	@Input() public typeId = "";
	@Input() public masterdataId = "";
}
