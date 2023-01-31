import { FormGroup } from "@angular/forms";

export function getRequiredFieldValue<T>(formGroup: FormGroup, fieldName: string): T {
	const value = getFieldValue<T>(formGroup, fieldName);

	if (value === null || value === undefined) {
		throw `Field ${fieldName} is required and must have a value.`;
	}

	return value;
}

export function getFieldValue<T>(formGroup: FormGroup, fieldName: string): T {
	const field = formGroup.get(fieldName);
	if (!field) {
		throw `Field ${fieldName} not found in form.`;
	}

	return field.value;
}
