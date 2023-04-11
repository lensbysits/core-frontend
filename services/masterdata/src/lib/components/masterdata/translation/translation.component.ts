import { Component, Input } from "@angular/core";
import { MasterdataCrudHttpService, MasterdataTranslationService } from "../../../core/services";

@Component({
	selector: "masterdata-translation",
	templateUrl: "./translation.component.html",
	styleUrls: ["./translation.component.scss"]
})
export class MasterdataTranslationComponent {
	isLoading = false;

	@Input() public typeId = "";
	@Input() public masterdataId = "";
	@Input() public showHeader = true;
	@Input() public viewOnly = false;

	constructor(private readonly service: MasterdataCrudHttpService, public readonly translationService: MasterdataTranslationService) {}
}
