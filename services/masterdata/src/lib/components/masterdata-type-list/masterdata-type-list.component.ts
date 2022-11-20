import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ILazyLoadEvent } from '@lens/ui-prime-components';
import { MasterdataType } from '../../services/models';
import { MasterdataCrudHttpService } from '../../services/services';

@Component({
  selector: 'lens-masterdata-type-list',
  templateUrl: './masterdata-type-list.component.html',
  styleUrls: ['./masterdata-type-list.component.scss'],
})
export class MasterdataTypeListComponent implements OnInit {
  isLoading = false;
  items: MasterdataType[] = [];
  totalSize = 0;

  constructor(
    private readonly service: MasterdataCrudHttpService,
    private readonly router: Router,
    private readonly activeRoute: ActivatedRoute
  ) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // this.loadItems();
  }

  loadItems() {
    this.isLoading = true;
    this.service.getAllMasterdataTypes().subscribe({
      next: (data) => {
        console.log('loadItems', data);
        this.items = data.value || [];
        this.totalSize = data.totalSize || 0;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        console.log('isLoading', this.isLoading, 'items', this.items);
      },
    });
  }

  public onLazyLoadData(event: ILazyLoadEvent): void {
    this.loadItems();
  }

  public onRowSelect(event: any, item: MasterdataType) {
    console.log('onRowSelect', event, item);
    const route = `details/${item.id}`;
    // this.router.navigate([`/masterdata/type/${route}`]);
    this.router.navigate([route], {
      relativeTo: this.activeRoute,
      // queryParams: { id: item.id },
    });
  }

  public onDelete(item: MasterdataType) {
    console.log('onDelete item', item);
    this.isLoading = true;
    if (!confirm('Are you sure?') === true) {
      this.isLoading = false;
      return;
    }

    if (!item.id) {
      this.isLoading = false;
      return;
    }

    this.items = this.items.filter((curitem) => item !== curitem);
    this.service.deleteMasterdataType(item.id).subscribe((data) => {
      console.log('onDelete', data);
      this.totalSize--;
      this.isLoading = false;
    });
  }
}
