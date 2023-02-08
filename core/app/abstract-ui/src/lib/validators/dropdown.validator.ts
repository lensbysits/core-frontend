import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { KeyValuePair } from "@lens/app-abstract";

export class DropdownValidator {
	public static dropdownNotDefaultOrEmpty: ValidatorFn = (
		control: AbstractControl
	): ValidationErrors | null => {
		const value = control.value; // as KeyValuePair<string | number, string>;
		const isValid =
			value &&
			value.key !== undefined &&
			value.key !== null &&
			value.key !== "" &&
			value.key !== 0;

		return isValid ? null : { required: true };
	};
}
