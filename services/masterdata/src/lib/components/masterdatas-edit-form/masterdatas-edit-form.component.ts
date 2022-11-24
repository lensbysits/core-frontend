import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@lens/ui-prime-components';
import { Masterdata, MasterdataType } from '../../services/models';
import {
  IMasterdataCreate,
  IMasterdataUpdate,
} from '../../services/interfaces';
import { MasterdataCrudHttpService } from '../../services/services';
import { MasterdataMaxLength } from '../../services/utils';

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
  formTitle = 'Add';
  needsTypeIdSelector = false;
  item?: Masterdata;
  maxLength = MasterdataMaxLength;
  typesList: MasterdataType[] = [];
  selectedTypeId = null;

  constructor(
    private readonly service: MasterdataCrudHttpService,
    private readonly router: Router,
    private readonly activeRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    this.typeId = this.activeRoute.snapshot.params['typeId'];
    this.isAddForm = !(this.id !== undefined);
    this.needsTypeIdSelector = !(this.typeId !== undefined);

    if (!this.isAddForm) {
      this.loadData();
      this.saveBtnText = 'Update';
      this.formTitle = 'Edit';
    }
    if (this.isAddForm && this.needsTypeIdSelector) {
      this.loadTypesList();
    }

    const whenAddForm = this.isAddForm && {
      masterdataTypeId: [this.typeId ?? '', [Validators.required]],
      key: [
        '',
        [Validators.required, Validators.maxLength(this.maxLength.key)],
      ],
    };
    this.dataForm = this.formBuilder.group({
      ...whenAddForm,
      value: [
        '',
        [Validators.required, Validators.maxLength(this.maxLength.value)],
      ],
      name: [
        '',
        [Validators.required, Validators.maxLength(this.maxLength.name)],
      ],
      description: ['', [Validators.maxLength(this.maxLength.description)]],
    });
  }

  // convenience getter for easy access to form fields
  get getFormFields() {
    return this.dataForm.controls;
  }

  loadData() {
    this.isLoading = true;
    this.service.getMasterdataById(this.typeId, this.id).subscribe((data) => {
      this.dataForm.patchValue(data);
      this.item = data || {};
      this.isLoading = false;
    });
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
          this.toastService.success(
            'Add masterdata',
            'The masterdatae was succesfully added.'
          );
        });
    } else {
      this.service
        .updateMasterdata(this.id, this.dataForm.value as IMasterdataUpdate)
        .subscribe((data) => {
          console.log('onSubmit update', data);
          this.btnCancel();
          this.isLoading = false;
          this.toastService.success(
            'Update masterdata',
            'The masterdata was succesfully updated.'
          );
        });
    }
  }

  btnCancel() {
    this.router.navigate(['masterdatas']);
  }

  loadTypesList() {
    this.isLoading = true;
    this.service.getAllMasterdataTypes().subscribe({
      next: (data) => {
        console.log('loadItems', data);
        this.typesList = data.value || [];
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        console.log('isLoading', this.isLoading, 'items', this.typesList);
      },
    });
  }
}
