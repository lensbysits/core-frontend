export interface IMasterdataTranslation<T> {
	language: string;
	isDefault: boolean;
	values: IMasterdataTranslationField<T>[];
}

export interface IMasterdataTranslationField<T> {
	field: T;
	value: string;
}
