import { IAdapter } from "../../interfaces";
import { MasterdataRelatedItem } from "../../models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class MasterdataRelatedItemModelAdapter implements IAdapter<any, MasterdataRelatedItem> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	adapt(source: any): MasterdataRelatedItem {
		return {
			masterdataTypeId: source?.masterdataTypeId,
			masterdataTypeName: source?.masterdataTypeName,
			id: source?.id,
			name: source?.name,
			key: source?.key,
			value: source?.value
		};
	}
}
