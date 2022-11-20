import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ILazyLoadEvent } from '@lens/ui-prime-components';
import { Masterdata } from '../../services/models';
import { MasterdataCrudHttpService } from '../../services/services';

@Component({
  selector: 'lens-masterdatas-list',
  templateUrl: './masterdatas-list.component.html',
  styleUrls: ['./masterdatas-list.component.scss'],
})
export class MasterdatasListComponent implements OnInit {
  isLoading = false;
  items: Masterdata[] = [];
  totalSize = 0;
  typeId = '';

  constructor(
    private readonly service: MasterdataCrudHttpService,
    private readonly router: Router,
    private readonly activeRoute: ActivatedRoute
  ) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.typeId = this.activeRoute.snapshot.paramMap.get('typeId') ?? '';
    //this.loadItems();
  }

  loadItems() {
    this.isLoading = true;
    this.service.getAllMasterdatas(this.typeId).subscribe({
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

  public onRowSelect(event: any, item: Masterdata) {
    console.log('onRowSelect', event, item);
    const route = `details/${item.masterdataTypeId}/${item.id}`;
    this.router.navigate([`/masterdatas/${route}`]);
  }

  public onDelete(item: Masterdata) {
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
    this.service.deleteMasterdata(item.id).subscribe((data) => {
      console.log('onDelete', data);
      this.totalSize--;
      this.isLoading = false;
    });
  }
}
