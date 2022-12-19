export interface IMasterdataCreate {
	masterdataTypeId: string;
	key: string;
	value: string;
	name: string;
	description?: string;
	metadata?: any;
}
