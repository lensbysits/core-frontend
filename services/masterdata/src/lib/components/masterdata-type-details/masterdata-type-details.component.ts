import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { MasterdataType } from "../../core/models";
import { MasterdataCrudHttpService } from "../../core/services";

@Component({
  selector: "lens-masterdata-type-details",
  templateUrl: "./masterdata-type-details.component.html",
  styleUrls: ["./masterdata-type-details.component.scss"],
})
export class MasterdataTypeDetailsComponent implements OnInit {
  isLoading = false;
  itemId = "";
  // item?: MasterdataType;
  item$?: Observable<MasterdataType | undefined>;

  constructor(
    private readonly service: MasterdataCrudHttpService,
    private readonly activeRoute: ActivatedRoute,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.itemId = this.activeRoute.snapshot.paramMap.get("id") ?? "";
    this.loadItem(this.itemId);
  }

  loadItem(id: string) {
    this.isLoading = true;
    // this.service.getMasterdataTypeById(id).subscribe((data) => {
    //   console.log('loadItem', data);
    //   this.item = data || {};
    //   this.isLoading = false;
    // });
    this.item$ = this.service.getMasterdataTypeById(id).pipe(
      tap((data) => {
        console.log("loadItem", data);
        this.isLoading = false;
      }),
      map((data) => data)
    );
  }

  prepareForDisplay(item: MasterdataType) {
    return Object.entries(item).map((item) => {
      item[0] = item[0].toLowerCase();
      if (item[0] === "masterdatascount") {
        item[0] = `masterdatas ${item[0].replace("masterdatas", "")}`;
      }
      return item;
    });
  }
}
