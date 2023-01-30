import { Component, OnInit, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { JsonEditorComponent, JsonEditorOptions } from "@maaxgr/ang-jsoneditor";
import { Masterdata } from "../../core/models";
import { MasterdataCrudHttpService } from "../../core/services";

@Component({
	selector: "lens-masterdatas-details",
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
		private readonly service: MasterdataCrudHttpService,
		private readonly activeRoute: ActivatedRoute,
		private readonly location: Location
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
		return Object.entries(item).map(item => {
			item[0] = item[0].toLowerCase().replace("masterdata", "");
			if (["typeid", "typename"].includes(item[0])) {
				item[0] = `type ${item[0].replace("type", "")}`;
			}
			return item;
		});
	}
}
