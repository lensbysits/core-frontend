//import { MasterdataType as MasterdataTypeApiModel } from '../../api-clients';
import { IAdapter } from "../../interfaces";
import { MasterdataType } from "../../models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class MasterdataTypeModelAdapter implements IAdapter<any, MasterdataType> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	adapt(source: any): MasterdataType {
		return {
			id: source?.id,
			code: source?.code,
			name: source?.name,
			description: source?.description,
			masterdatasCount: source?.masterdatasCount,
			metadata: source?.metadata
		};
	}
}
