import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

@Injectable()
export class LanguageExistsValidator {
	checkIfLanguageExists(languages: string[] = []): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const value = control.value;

			if (!value) {
				return null;
			}

			return languages.includes(value) ? { exists: "The language already exists." } : null;
		};
	}
}
