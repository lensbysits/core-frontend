import { IMasterdataTranslationFlat } from "../../interfaces";
import { LanguageItem } from "./language-model";

export class MasterdataTranslationDialogData {
	item: IMasterdataTranslationFlat | null;
	isTypeModel!: boolean;
	isAddForm!: boolean;
	translatableFields: string[] = [];
	currentLanguages: string[] = [];
	languagesList: LanguageItem[] = [];

	constructor(
		item: IMasterdataTranslationFlat | null,
		isTypeModel: boolean,
		isAddForm: boolean,
		translatableFields: string[],
		currentLanguages: string[],
		languagesList: LanguageItem[]
	) {
		this.item = item;
		this.isTypeModel = isTypeModel;
		this.isAddForm = isAddForm;
		this.translatableFields = translatableFields;
		this.currentLanguages = currentLanguages;
		this.languagesList = languagesList;
	}
}
