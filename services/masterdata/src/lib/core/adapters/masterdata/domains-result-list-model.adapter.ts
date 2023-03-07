import { IAdapter } from "../../interfaces";
import { DomainsResultList } from "../../models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class DomainsResultListModelAdapter implements IAdapter<any, DomainsResultList> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	adapt(source: any): DomainsResultList {
		if (!source) {
			return {
				totalSize: 0,
				value: []
			};
		}
		return {
			totalSize: source.totalSize,
			value: source.value?.map((item: string) => item)
		};
	}
}
