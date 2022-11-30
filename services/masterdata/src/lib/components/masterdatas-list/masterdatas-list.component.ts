import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ILazyLoadEvent } from "@lens/ui-prime-components";
import { Masterdata } from "../../services/models";
import { MasterdataCrudHttpService } from "../../services/services";

@Component({
  selector: "lens-masterdatas-list",
  templateUrl: "./masterdatas-list.component.html",
  styleUrls: ["./masterdatas-list.component.scss"],
})
export class MasterdatasListComponent implements OnInit {
  isLoading = false;
  items: Masterdata[] = [];
  totalSize = 0;
  typeId = "";

  constructor(
    private readonly service: MasterdataCrudHttpService,
    private readonly router: Router,
    private readonly activeRoute: ActivatedRoute
  ) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.isLoading = true;
    this.typeId = this.activeRoute.snapshot.paramMap.get("typeId") ?? "";
    //this.loadItems();
  }

  loadItems(offset: number, rows: number) {
    this.isLoading = true;
    this.service.getAllMasterdatas(this.typeId, offset, rows).subscribe({
      next: (data) => {
        console.log("loadItems", data);
        this.items = data.value || [];
        this.totalSize = data.totalSize || 0;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        console.log("isLoading", this.isLoading, "items", this.items);
      },
    });
  }

  onLazyLoadData(event: ILazyLoadEvent): void {
    this.loadItems(event.offset, event.rows);
  }

  onRowClicked(item: Masterdata) {
    console.log("onRowClicked", item);
    this.router.navigate([`/masterdatas/details/${item.masterdataTypeId}/${item.id}`]);
  }

  onAddAction() {
    console.log("onAddAction");
    this.router.navigate([`/masterdatas/add`]);
  }

  onDeleteActionClicked(item: any) {
    console.log("onDeleteActionClicked item", item);
    this.isLoading = true;
    if (!confirm("Are you sure?") === true) {
      this.isLoading = false;
      return;
    }

    if (!item.id) {
      this.isLoading = false;
      return;
    }

    this.items = this.items.filter((curitem) => item !== curitem);
    this.service.deleteMasterdata(item.id).subscribe((data) => {
      console.log("onDeleteActionClicked", data);
      this.totalSize--;
      this.isLoading = false;
    });
  }

  onEditActionClicked(item: any) {
    console.log("onEditActionClicked", item);
    this.router.navigate([`/masterdatas/${item.masterdataTypeId}/edit/${item.id}`]);
  }
}
