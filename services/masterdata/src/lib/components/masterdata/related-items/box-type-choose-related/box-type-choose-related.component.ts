import { Component, Input, OnInit } from "@angular/core";
import { MasterdataRelatedItemGroupedByTypeItem } from "../../../../core/models";
import { MasterdataCrudHttpService } from "../../../../core/services";

@Component({
	selector: "masterdata-related-items-box-type-choose-related",
	templateUrl: "./box-type-choose-related.component.html",
	styleUrls: ["./box-type-choose-related.component.scss"]
})
export class MasterdataRelatedItemsBoxTypeChooseRelatedComponent implements OnInit {
	isLoading = false;

	@Input() public typeId = "";
	@Input() public relatedItems: MasterdataRelatedItemGroupedByTypeItem[] = [];

	constructor(private readonly service: MasterdataCrudHttpService) {}

	ngOnInit(): void {
		console.log("box-type-choose/relatedItems", `typeId=${this.typeId}`, this.relatedItems);
	}
}
