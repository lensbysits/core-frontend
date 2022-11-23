import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@lens/ui-prime-components';
import { MasterdataType } from '../../services/models';
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
  dataForm!: FormGroup;
  isFormSubmitted = false;
  isAddForm = true;
  saveBtnText = 'Save';
  formTitle = 'Add';
  item?: MasterdataType;

  constructor(
    private readonly service: MasterdataCrudHttpService,
    private readonly router: Router,
    private readonly activeRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    this.isAddForm = !(this.id !== undefined);

    if (!this.isAddForm) {
      this.loadData();
      this.saveBtnText = 'Update';
      this.formTitle = 'Edit';
    }

    this.dataForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
    });
  }

  // convenience getter for easy access to form fields
  get getFormFields() {
    return this.dataForm.controls;
  }

  loadData() {
    this.isLoading = true;
    this.service.getMasterdataTypeById(this.id).subscribe((data) => {
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
        .createMasterdataType(this.dataForm.value as IMasterdataTypeCreate)
        .subscribe((data) => {
          console.log('onSubmit create', data);
          this.btnCancel();
          this.isLoading = false;
          this.toastService.success(
            'Add masterdata type',
            'The masterdata type was succesfully added.'
          );
        });
    } else {
      this.service
        .updateMasterdataType(
          this.id,
          this.dataForm.value as IMasterdataTypeUpdate
        )
        .subscribe((data) => {
          console.log('onSubmit update', data);
          this.btnCancel();
          this.isLoading = false;
          this.toastService.success(
            'Update masterdata type',
            'The masterdata type was succesfully updated.'
          );
        });
    }
  }

  btnCancel() {
    this.router.navigate(['type']);
  }
}
