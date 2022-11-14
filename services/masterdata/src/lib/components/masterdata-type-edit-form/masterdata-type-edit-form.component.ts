import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IMasterdataTypeCreate,
  IMasterdataTypeUpdate,
} from '../../services/interfaces';
import { MasterdataCrudHttpService } from '../../services/services';

@Component({
  selector: 'lens-masterdata-type-edit-form',
  templateUrl: './masterdata-type-edit-form.component.html',
  styleUrls: ['./masterdata-type-edit-form.component.scss'],
})
export class MasterdataTypeEditFormComponent implements OnInit {
  isLoading = false;
  id!: string;
  formadd!: FormGroup;
  submitted = false;
  btnText = 'Save';
  title = 'New Masterdata-type';
  isAddForm = true;

  constructor(
    private readonly service: MasterdataCrudHttpService,
    private readonly router: Router,
    private readonly activeRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    this.isAddForm = !(this.id !== undefined);

    if (!this.isAddForm) {
      this.loadData();
      this.btnText = 'Update';
      this.title = 'Edit Masterdata-type';
    }

    this.formadd = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: [''], //['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get getFormFields() {
    return this.formadd.controls;
  }

  loadData() {
    this.service
      .getMasterdataTypeById(this.id)
      .subscribe((x) => this.formadd.patchValue(x));
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formadd.invalid) {
      return;
    }

    this.isLoading = true;
    if (this.isAddForm) {
      this.service
        .createMasterdataType(this.formadd.value as IMasterdataTypeCreate)
        .subscribe((data) => {
          console.log('onSubmit create', data);
          this.btnCancel();
          this.isLoading = false;
        });
    } else {
      this.service
        .updateMasterdataType(
          this.id,
          this.formadd.value as IMasterdataTypeUpdate
        )
        .subscribe((data) => {
          console.log('onSubmit update', data);
          this.btnCancel();
          this.isLoading = false;
        });
    }
  }

  btnCancel() {
    this.router.navigate(['masterdata/type']);
  }
}
