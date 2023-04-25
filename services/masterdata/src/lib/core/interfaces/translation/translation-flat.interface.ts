export interface IMasterdataTranslationFlat {
	language: string;
	languageName?: string;
	isDefault: boolean;
	isDefaultForDisplay: string;
	[key: string]: string | boolean | undefined;
}
