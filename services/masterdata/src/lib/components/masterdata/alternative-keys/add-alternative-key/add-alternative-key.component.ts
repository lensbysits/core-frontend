import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { KeyValuePair, LanguageService, ToastService } from "@lens/app-abstract";
import { TranslateService } from "@ngx-translate/core";
import { Subject, takeUntil } from "rxjs";
import { IMasterdataAlternativeKeyCreate } from "../../../../core/interfaces";
import { MasterdataAlternativeKeyService, MasterdataCrudHttpService } from "../../../../core/services";
import { MasterdataAlternativeKeyMaxLength, getRequiredFieldValue } from "../../../../core/utils";

@Component({
	selector: "masterdata-alternative-key-add",
	templateUrl: "./add-alternative-key.component.html",
	styleUrls: ["./add-alternative-key.component.scss"]
})
export class MasterdataAlternativeKeyAddComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();

	public isLoading = false;
	public dataForm!: FormGroup;
	public isFormSubmitted = false;
	public maxLength = MasterdataAlternativeKeyMaxLength;
	public saveFormButtonText!: string;
	public domainsList: KeyValuePair<string, string>[] = [];

	@Input() public typeId = "";
	@Input() public masterdataId = "";

	// convenience getter for easy access to form fields
	public get getFormFields() {
		return this.dataForm.controls;
	}

	constructor(
		private readonly service: MasterdataCrudHttpService,
		private readonly router: Router,
		private readonly activeRoute: ActivatedRoute,
		private readonly formBuilder: FormBuilder,
		private readonly toastService: ToastService,
		private readonly translateService: TranslateService,
		private readonly languageService: LanguageService,
		private readonly alternativeKeyService: MasterdataAlternativeKeyService
	) {
		this.isLoading = true;
		this.alternativeKeyService.alternativeKeyRemoved$.pipe(takeUntil(this.destroy$)).subscribe({
			next: () => {
				this.loadDomainsList();
				this.isLoading = false;
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	public ngOnInit(): void {
		this.dataForm = this.formBuilder.group({
			domain: ["", [Validators.required, Validators.maxLength(this.maxLength.domain)]],
			key: ["", [Validators.required, Validators.maxLength(this.maxLength.key)]]
		});

		this.loadDomainsList();
		this.buildTranslationTexts();
	}

	public ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public onSubmit() {
		this.isFormSubmitted = true;
		if (this.dataForm.invalid) {
			return;
		}

		this.isLoading = true;

		const domain = getRequiredFieldValue<string>(this.dataForm, "domain");
		const key = getRequiredFieldValue<string>(this.dataForm, "key");

		const model = {} as IMasterdataAlternativeKeyCreate;
		model.masterdataId = this.masterdataId;
		model.domain = domain;
		model.key = key;

		this.service.createMasterdataAlternativeKey(this.typeId, model).subscribe({
			next: () => {
				this.alternativeKeyService.onAlternativeKeyAdded();
				this.toastService.success(
					this.translateService.instant("masterdatamgmt.pages.masterdataAlternativeKeyUpsert.notifications.successAdd.title"),
					this.translateService.instant("masterdatamgmt.pages.masterdataAlternativeKeyUpsert.notifications.successAdd.message")
				);

				this.isFormSubmitted = false;
				this.dataForm.reset();
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	private loadDomainsList() {
		this.isLoading = true;
		this.service.getAllDomains(this.typeId, this.masterdataId, 0, 0).subscribe({
			next: data => {
				this.domainsList = (data.value || []).map(v => new KeyValuePair<string, string>(v, v));
				this.isLoading = false;
			},
			complete: () => (this.isLoading = false),
			error: () => (this.isLoading = false)
		});
	}

	private buildTranslationTexts() {
		this.languageService.onTranslationsLoaded(() => {
			this.saveFormButtonText = `masterdatamgmt.pages.masterdataAlternativeKeyUpsert.buttons.btnSubmitAddForm`;
		});
	}
}
