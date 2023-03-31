import { IAdapter } from "../../interfaces";
import { MasterdataRelatedItem, MasterdataRelatedItemResultList } from "../../models";
import { MasterdataRelatedItemModelAdapter } from "./related-item-model.adapter";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class MasterdataRelatedItemResultListModelAdapter implements IAdapter<any, MasterdataRelatedItemResultList> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	adapt(source: any): MasterdataRelatedItemResultList {
		const masterdataRelatedItemModelAdapter = new MasterdataRelatedItemModelAdapter();
		if (!source) {
			return {
				totalSize: 0,
				value: []
			};
		}
		return {
			totalSize: source.valueSize,
			value: source.value?.map((item: MasterdataRelatedItem) => masterdataRelatedItemModelAdapter.adapt(item))
		};
	}
}
