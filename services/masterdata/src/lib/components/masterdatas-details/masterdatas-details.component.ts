import { Component, OnInit, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { map, Observable, tap } from "rxjs";
import { JsonEditorComponent, JsonEditorOptions } from "@maaxgr/ang-jsoneditor";
import { Masterdata } from "../../core/models";
import { MasterdataCrudHttpService, MasterdataHelperService } from "../../core/services";

@Component({
	selector: "masterdata-details",
	templateUrl: "./masterdatas-details.component.html",
	styleUrls: ["./masterdatas-details.component.scss"]
})
export class MasterdatasDetailsComponent implements OnInit {
	isLoading = false;
	itemId = "";
	typeId = "";
	// item?: Masterdata;
	item$?: Observable<Masterdata | undefined>;

	@ViewChild(JsonEditorComponent, { static: false }) metadataEditor!: JsonEditorComponent;

	constructor(
		private readonly masterdataHelper: MasterdataHelperService,
		private readonly service: MasterdataCrudHttpService,
		private readonly activeRoute: ActivatedRoute,
		private readonly location: Location,
		private readonly translateService: TranslateService
	) {}

	ngOnInit(): void {
		this.itemId = this.activeRoute.snapshot.paramMap.get("masterdata") ?? "";
		this.typeId = this.activeRoute.snapshot.paramMap.get("masterdatatype") ?? "";
		this.loadItem(this.typeId, this.itemId);
	}

	makeMetadataEditorOptions(): JsonEditorOptions {
		const opt = new JsonEditorOptions();
		opt.mode = "view";
		opt.modes = ["text", "view"];
		return opt;
	}

	loadItem(typeId: string, id: string) {
		this.isLoading = true;
		this.item$ = this.service.getMasterdataById(typeId, id).pipe(
			tap(() => {
				this.isLoading = false;
			}),
			map(data => data)
		);
	}

	prepareForDisplay(item: Masterdata) {
		return this.masterdataHelper.prepareForDisplay<Masterdata>(item, "masterdataDetails");
	}
}
