import { Component, OnInit, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { map, Observable, tap } from "rxjs";
import { JsonEditorComponent, JsonEditorOptions } from "@maaxgr/ang-jsoneditor";
import { MasterdataType } from "../../core/models";
import { MasterdataCrudHttpService, MasterdataHelperService } from "../../core/services";

@Component({
	selector: "masterdata-type-details",
	templateUrl: "./masterdata-type-details.component.html",
	styleUrls: ["./masterdata-type-details.component.scss"]
})
export class MasterdataTypeDetailsComponent implements OnInit {
	isLoading = false;
	itemId = "";
	item$?: Observable<MasterdataType | undefined>;

	@ViewChild(JsonEditorComponent, { static: false }) metadataEditor!: JsonEditorComponent;

	constructor(
		private readonly masterdataHelper: MasterdataHelperService,
		private readonly service: MasterdataCrudHttpService,
		private readonly activeRoute: ActivatedRoute,
		private readonly location: Location,
		private readonly translateService: TranslateService
	) {}

	ngOnInit(): void {
		this.itemId = this.activeRoute.snapshot.paramMap.get("masterdatatype") ?? "";
		this.loadItem(this.itemId);
	}

	makeMetadataEditorOptions(): JsonEditorOptions {
		const opt = new JsonEditorOptions();
		opt.mode = "view";
		opt.modes = ["text", "view"];
		return opt;
	}

	loadItem(id: string) {
		this.isLoading = true;
		this.item$ = this.service.getMasterdataTypeById(id).pipe(
			tap(() => {
				this.isLoading = false;
			}),
			map(data => data)
		);
	}

	prepareForDisplay(item: MasterdataType) {
		return this.masterdataHelper.prepareForDisplay<MasterdataType>(item, "masterdataTypeDetails");
	}
}
