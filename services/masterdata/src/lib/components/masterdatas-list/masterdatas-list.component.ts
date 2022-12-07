import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ILazyLoadEvent } from "@lens/ui-prime-components";
import { Observable } from "rxjs";
import { Masterdata, MasterdataType } from "../../core/models";
import { MasterdataCrudHttpService } from "../../core/services";

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
  masterdataType$?: Observable<MasterdataType>;

  constructor(
    private readonly service: MasterdataCrudHttpService,
    private readonly router: Router,
    private readonly activeRoute: ActivatedRoute
  ) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.isLoading = true;
    this.typeId = this.activeRoute.snapshot.paramMap.get("masterdatatype") ?? "";
    //this.loadItems();
  }

  loadItems(offset: number, rows: number) {
    this.isLoading = true;

    if (this.typeId) this.masterdataType$ = this.service.getMasterdataTypeById(this.typeId);

    this.service.getAllMasterdatas(this.typeId, offset, rows).subscribe({
      next: (data) => {
        this.items = data.value || [];
        this.totalSize = data.totalSize || 0;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onLazyLoadData(event: ILazyLoadEvent): void {
    this.loadItems(event.offset, event.rows);
  }

  onRowClicked(item: Masterdata) {
    this.router.navigate([`${item.id}`], { relativeTo: this.activeRoute });
  }

  onAddAction() {
    this.router.navigate(["add"], { relativeTo: this.activeRoute });
  }

  onDeleteActionClicked(item: any) {
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
    this.service.deleteMasterdata(this.typeId, item.id).subscribe(() => {
      this.totalSize--;
      this.isLoading = false;
    });
  }

  onEditActionClicked(item: any) {
    this.router.navigate([`${item.id}`, "edit"], { relativeTo: this.activeRoute });
  }
}
