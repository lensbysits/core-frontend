import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MasterdataType } from '../../services/models';
import { MasterdataCrudHttpService } from '../../services/services';

@Component({
  selector: 'lens-masterdata-type-details',
  templateUrl: './masterdata-type-details.component.html',
  styleUrls: ['./masterdata-type-details.component.scss'],
})
export class MasterdataTypeDetailsComponent implements OnInit {
  isLoading = false;
  itemId = '';
  item?: MasterdataType;

  constructor(
    private readonly service: MasterdataCrudHttpService,
    private readonly activeRoute: ActivatedRoute,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    // this.activeRoute.params.subscribe((parameter) => {
    //   this.itemId = parameter['id'];
    //   this.loadItem(this.itemId);
    // });

    this.itemId = this.activeRoute.snapshot.paramMap.get('id') ?? '';
    this.loadItem(this.itemId);
  }

  loadItem(id: string) {
    this.isLoading = true;
    this.service.getMasterdataTypeById(id).subscribe((data) => {
      console.log('loadItem', data);
      this.item = data || {};
      this.isLoading = false;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
