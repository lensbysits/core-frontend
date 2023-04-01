import { IAdapter } from "../../interfaces";
import { MasterdataAlternativeKey, MasterdataAlternativeKeyResultList } from "../../models";
import { MasterdataAlternativeKeyModelAdapter } from "./alternative-key-model.adapter";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class MasterdataAlternativeKeyResultListModelAdapter implements IAdapter<any, MasterdataAlternativeKeyResultList> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	adapt(source: any): MasterdataAlternativeKeyResultList {
		const masterdataAlternativeKeyModelAdapter = new MasterdataAlternativeKeyModelAdapter();
		if (!source) {
			return {
				totalSize: 0,
				value: []
			};
		}
		return {
			totalSize: source.totalSize,
			value: source.value?.map((item: MasterdataAlternativeKey) => masterdataAlternativeKeyModelAdapter.adapt(item))
		};
	}
}
