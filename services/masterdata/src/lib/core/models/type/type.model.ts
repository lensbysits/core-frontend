import { IMasterdataTranslation, IMasterdataTypeCreate, IMasterdataTypeUpdate } from "../../interfaces";

export class MasterdataType implements IMasterdataTypeCreate, IMasterdataTypeUpdate {
	id!: string;
	code!: string;
	name!: string;
	description?: string;
	masterdatasCount?: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	metadata?: any;
	translation?: IMasterdataTranslation[];
}
