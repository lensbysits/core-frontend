import { Component, Input } from "@angular/core";
import { MasterdataCrudHttpService, MasterdataTranslationService } from "../../core/services";

@Component({
	selector: "masterdata-translation",
	templateUrl: "./translation.component.html",
	styleUrls: ["./translation.component.scss"]
})
export class MasterdataTranslationComponent {
	isLoading = false;

	@Input() public showHeader = true;
	@Input() public viewOnly = false;
	@Input() public typeId = "";
	@Input() public masterdataId = "";

	constructor(private readonly service: MasterdataCrudHttpService, public readonly translationService: MasterdataTranslationService) {}
}
