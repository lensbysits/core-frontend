import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Masterdata } from '../../services/models';
import { MasterdataCrudHttpService } from '../../services/services';

@Component({
  selector: 'lens-masterdatas-details',
  templateUrl: './masterdatas-details.component.html',
  styleUrls: ['./masterdatas-details.component.scss'],
})
export class MasterdatasDetailsComponent implements OnInit {
  isLoading = false;
  itemId = '';
  typeId = '';
  item?: Masterdata;

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
    this.typeId = this.activeRoute.snapshot.paramMap.get('typeId') ?? '';
    this.loadItem(this.typeId, this.itemId);
  }

  loadItem(typeId: string, id: string) {
    this.isLoading = true;
    this.service.getMasterdataById(typeId, id).subscribe((data) => {
      console.log('loadItem', data);
      this.item = data || {};
      this.isLoading = false;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
