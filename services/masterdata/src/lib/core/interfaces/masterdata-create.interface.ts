export interface IMasterdataCreate {
	masterdataTypeId: string;
	key: string;
	value: string;
	name: string;
	description?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	metadata?: any;
  tags?: string[];
}
