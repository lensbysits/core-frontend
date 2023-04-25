import { IMasterdataTranslation } from "./translation.interface";

export interface IMasterdataTranslationUpdateMdType {
	translations: IMasterdataTranslation<"name" | "description">[];
}
