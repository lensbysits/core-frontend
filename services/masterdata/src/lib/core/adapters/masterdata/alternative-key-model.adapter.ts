import { IAdapter } from "../../interfaces";
import { MasterdataAlternativeKey } from "../../models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class MasterdataAlternativeKeyModelAdapter implements IAdapter<any, MasterdataAlternativeKey> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	adapt(source: any): MasterdataAlternativeKey {
		return {
			id: source?.id,
			masterdataId: source?.masterdataId,
			domain: source?.domain,
			key: source?.key
		};
	}
}
