import { IMasterdataAlternativeKeyCreate } from "../../interfaces";

export class MasterdataAlternativeKey implements IMasterdataAlternativeKeyCreate {
	id!: string;
	masterdataId!: string;
	domain!: string;
	key!: string;
}
