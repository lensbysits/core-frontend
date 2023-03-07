export interface IMasterdataTypeCreate {
	code: string;
	name: string;
	description?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	metadata?: any;
}
