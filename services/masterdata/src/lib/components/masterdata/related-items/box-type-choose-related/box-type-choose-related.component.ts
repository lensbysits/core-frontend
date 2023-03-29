import { Component, Input } from "@angular/core";
import { MasterdataRelatedItemGroupedByTypeItem } from "../../../../core/models";

@Component({
	selector: "masterdata-related-items-box-type-choose-related",
	templateUrl: "./box-type-choose-related.component.html",
	styleUrls: ["./box-type-choose-related.component.scss"]
})
export class MasterdataRelatedItemsBoxTypeChooseRelatedComponent {
	isLoading = false;
	toggle = false;

	@Input() public typeId = "";
	@Input() public relatedItems: MasterdataRelatedItemGroupedByTypeItem[] = [];

	refreshByToggle() {
		this.toggle = !this.toggle;
	}
}
