import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IMasterdataCreate,
  IMasterdataUpdate,
} from '../../services/interfaces';
import { MasterdataType } from '../../services/models';
import { MasterdataCrudHttpService } from '../../services/services';

@Component({
  selector: 'lens-masterdatas-edit-form',
  templateUrl: './masterdatas-edit-form.component.html',
  styleUrls: ['./masterdatas-edit-form.component.scss'],
})
export class MasterdatasEditFormComponent implements OnInit {
  isLoading = false;
  id!: string;
  typeId = '';
  dataForm!: FormGroup;
  isFormSubmitted = false;
  isAddForm = true;
  saveBtnText = 'Save';
  formTitle = 'Add Masterdata';
  needsTypeIdSelector = false;
  selectedMdt = null;
  mdtList: MasterdataType[] = [];

  constructor(
    private readonly service: MasterdataCrudHttpService,
    private readonly router: Router,
    private readonly activeRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    this.typeId = this.activeRoute.snapshot.params['typeId'];
    this.isAddForm = !(this.id !== undefined);
    this.needsTypeIdSelector = !(this.typeId !== undefined);

    // TODO : set loadDate into a property of this class (so you can remove key from dataForm on update)
    if (!this.isAddForm) {
      this.loadData();
      this.saveBtnText = 'Update';
      this.formTitle = 'Edit Masterdata';
    }
    if (this.isAddForm && this.needsTypeIdSelector) {
      this.loadMdtList();
    }

    const whenAddForm = this.isAddForm && {
      masterdataTypeId: [this.typeId ?? '', Validators.required],
      key: ['', Validators.required],
    };
    this.dataForm = this.formBuilder.group({
      key: [''],
      ...whenAddForm,
      value: ['', Validators.required],
      name: ['', Validators.required],
      description: [''], //['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get getFormFields() {
    return this.dataForm.controls;
  }

  loadData() {
    this.service
      .getMasterdataById(this.typeId, this.id)
      .subscribe((x) => this.dataForm.patchValue(x));
  }

  onSubmit() {
    this.isFormSubmitted = true;

    if (this.dataForm.invalid) {
      // stop here if form is invalid
      return;
    }

    this.isLoading = true;
    if (this.isAddForm) {
      this.service
        .createMasterdata(this.dataForm.value as IMasterdataCreate)
        .subscribe((data) => {
          console.log('onSubmit create', data);
          this.btnCancel();
          this.isLoading = false;
        });
    } else {
      this.service
        .updateMasterdata(this.id, this.dataForm.value as IMasterdataUpdate)
        .subscribe((data) => {
          console.log('onSubmit update', data);
          this.btnCancel();
          this.isLoading = false;
        });
    }
  }

  btnCancel() {
    this.router.navigate(['masterdatas']);
  }

  loadMdtList() {
    this.isLoading = true;
    this.service.getAllMasterdataTypes().subscribe({
      next: (data) => {
        console.log('loadItems', data);
        this.mdtList = data.value || [];
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        console.log('isLoading', this.isLoading, 'items', this.mdtList);
      },
    });
  }
}
