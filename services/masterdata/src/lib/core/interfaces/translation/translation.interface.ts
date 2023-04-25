export interface IMasterdataTranslatedField<T> {
	field: T;
	value: string;
}

export interface IMasterdataTranslation<T> {
	language: string;
	isDefault: boolean;
	values: IMasterdataTranslatedField<T>[];
}
