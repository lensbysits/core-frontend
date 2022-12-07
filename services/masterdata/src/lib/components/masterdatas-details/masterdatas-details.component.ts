import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { Masterdata } from "../../core/models";
import { MasterdataCrudHttpService } from "../../core/services";

@Component({
  selector: "lens-masterdatas-details",
  templateUrl: "./masterdatas-details.component.html",
  styleUrls: ["./masterdatas-details.component.scss"],
})
export class MasterdatasDetailsComponent implements OnInit {
  isLoading = false;
  itemId = "";
  typeId = "";
  // item?: Masterdata;
  item$?: Observable<Masterdata | undefined>;

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

  loadItem(typeId: string, id: string) {
    this.isLoading = true;
    // this.service.getMasterdataById(typeId, id).subscribe((data) => {
    //   console.log('loadItem', data);
    //   this.item = data || {};
    //   this.isLoading = false;
    // });
    this.item$ = this.service.getMasterdataById(typeId, id).pipe(
      tap((data) => {
        console.log("loadItem", data);
        this.isLoading = false;
      }),
      map((data) => data)
    );
  }

  prepareForDisplay(item: Masterdata) {
    return Object.entries(item).map((item) => {
      item[0] = item[0].toLowerCase().replace("masterdata", "");
      if (["typeid", "typename"].includes(item[0])) {
        item[0] = `type ${item[0].replace("type", "")}`;
      }
      return item;
    });
  }
}
