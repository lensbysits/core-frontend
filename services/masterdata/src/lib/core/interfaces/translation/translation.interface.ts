export interface IMasterdataTranslatedField {
	field: string;
	value: string;
}

export interface IMasterdataTranslation {
	language: string;
	isDefault: boolean;
	values: IMasterdataTranslatedField[];
}
