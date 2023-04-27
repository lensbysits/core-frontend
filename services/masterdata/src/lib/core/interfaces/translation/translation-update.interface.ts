import { IMasterdataTranslation } from "./translation.interface";

export interface IMasterdataTranslationUpdateMdType {
	translations: IMasterdataTranslation<"name" | "description">[];
}

export interface IMasterdataTranslationUpdateMdItem {
	translations: IMasterdataTranslation<"value" | "name" | "description">[];
}
