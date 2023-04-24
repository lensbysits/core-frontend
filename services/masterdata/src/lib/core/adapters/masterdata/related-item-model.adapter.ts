import { IAdapter } from "../../interfaces";
import { MasterdataRelatedItem } from "../../models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class MasterdataRelatedItemModelAdapter implements IAdapter<any, MasterdataRelatedItem> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	adapt(source: any): MasterdataRelatedItem {
		return {
			id: source?.id,
			name: source?.name,
			key: source?.key,
			value: source?.value,
			masterdataTypeId: source?.masterdataTypeId,
			masterdataTypeName: source?.masterdataTypeName,
			childMasterdataCount: source?.childMasterdataCount,
			parentMasterdataCount: source?.parentMasterdataCount
		};
	}
}
