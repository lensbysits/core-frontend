import { IMasterdataCreate, IMasterdataTranslation, IMasterdataUpdate } from "../../interfaces";

export class Masterdata implements IMasterdataCreate, IMasterdataUpdate {
	id!: string;
	masterdataTypeId!: string;
	masterdataTypeName!: string;
	key!: string;
	value!: string;
	name!: string;
	description?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	metadata?: any;
	tags?: string[];
	masterdataKeysCount?: number;
	translation?: IMasterdataTranslation[];
}
