import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Masterdata } from '../../services/models';
import { MdtCrudHttpService } from '../../services/services';

// import { environment } from '../../../environments/environment';

@Component({
  selector: 'mdata-list',
  templateUrl: './mdata-list.component.html',
  styleUrls: ['./mdata-list.component.scss'],
})
export class MdataListComponent implements OnInit {
  
  isLoading = false;
  items$?: Observable<Masterdata[] | undefined>;
  totalSize = 0;
  typeId = '';

  constructor(
    private readonly service: MdtCrudHttpService,
    private readonly router: Router,
    private readonly activeRoute: ActivatedRoute
  ) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.typeId = this.activeRoute.snapshot.paramMap.get('typeId') ?? '';
    this.loadItems();
  }

  loadItems() {
    this.isLoading = false;
    this.items$ = this.service.getAllMasterdatas(this.typeId)
      .pipe(
        tap(data => {
           this.totalSize = data.totalSize || 0;
        }),
        map(data => data.value)
      );
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

    // this.items = this.items.filter((curitem) => item !== curitem);
    // this.service.deleteMasterdata(item.id).subscribe((data) => {
    //   console.log('onDelete', data);
    //   this.totalSize--;
    //   this.isLoading = false;
    // });
  }
}
