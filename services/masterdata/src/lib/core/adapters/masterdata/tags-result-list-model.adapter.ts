import { IAdapter } from "../../interfaces";
import { TagsResultList } from "../../models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class TagsResultListModelAdapter implements IAdapter<any, TagsResultList> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	adapt(source: any): TagsResultList {
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
