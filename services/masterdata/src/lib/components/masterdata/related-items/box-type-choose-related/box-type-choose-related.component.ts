import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MasterdataRelatedItemGroupedByTypeItem } from "../../../../core/models";
import { MasterdataCrudHttpService } from "../../../../core/services";

@Component({
	selector: "masterdata-related-items-box-type-choose-related",
	templateUrl: "./box-type-choose-related.component.html",
	styleUrls: ["./box-type-choose-related.component.scss"]
})
export class MasterdataRelatedItemsBoxTypeChooseRelatedComponent implements OnInit, OnChanges {
	isLoading = false;

	@Input() public typeId = "";
	@Input() public typeName = "";
	@Input() public relatedItems: MasterdataRelatedItemGroupedByTypeItem[] = [];

	public testForm = new FormGroup({
		foo: new FormControl()
	});

	constructor(private readonly service: MasterdataCrudHttpService) {}

	ngOnInit(): void {
		console.log("box-type-choose/relatedItems", this.relatedItems);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
	ngOnChanges(changes: SimpleChanges) {}

	onAddNewRelatedItems() {}
}
