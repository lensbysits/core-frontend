import { IAdapter } from "../interfaces";
import { MasterdataType, MasterdataTypeResultList } from "../models";
import { MasterdataTypeModelAdapter } from ".";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class MasterdataTypeResultListModelAdapter implements IAdapter<any, MasterdataTypeResultList> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	adapt(source: any): MasterdataTypeResultList {
		const masterdataTypeModelAdapter = new MasterdataTypeModelAdapter();
		if (!source) {
			return {
				totalSize: 0,
				value: []
			};
		}
		return {
			totalSize: source.totalSize,
			value: source.value?.map((item: MasterdataType) => masterdataTypeModelAdapter.adapt(item))
		};
	}
}
