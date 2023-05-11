import { IMasterdataTranslation } from "./translation.interface";

export interface IMasterdataTranslationUpdateMdType {
	translations: IMasterdataTranslation<"Name" | "Description">[];
}

export interface IMasterdataTranslationUpdateMdItem {
	translations: IMasterdataTranslation<"Name" | "Description" | "Value">[];
}
