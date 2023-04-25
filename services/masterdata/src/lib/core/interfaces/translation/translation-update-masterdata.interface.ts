import { IMasterdataTranslation } from "./translation.interface";

export interface IMasterdataTranslationUpdateMdItem {
	translations: IMasterdataTranslation<"value" | "name" | "description">[];
}
