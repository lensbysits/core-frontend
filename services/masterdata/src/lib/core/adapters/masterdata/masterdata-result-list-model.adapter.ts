import { IAdapter } from "../../interfaces";
import { Masterdata, MasterdataResultList } from "../../models";
import { MasterdataModelAdapter } from "./masterdata-model.adapter";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class MasterdataResultListModelAdapter implements IAdapter<any, MasterdataResultList> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	adapt(source: any): MasterdataResultList {
		const masterdataModelAdapter = new MasterdataModelAdapter();
		if (!source) {
			return {
				totalSize: 0,
				value: []
			};
		}
		return {
			totalSize: source.totalSize,
			value: source.value?.map((item: Masterdata) => masterdataModelAdapter.adapt(item))
		};
	}
}
