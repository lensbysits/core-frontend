import { IAdapter, ISourceLanguagesResultList } from "../../interfaces";
import { LanguageItem, LanguagesResultList } from "../../models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class LanguagesResultListModelAdapter implements IAdapter<any, LanguagesResultList> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	adapt(source: ISourceLanguagesResultList): LanguagesResultList {
		if (!source) {
			return {
				totalSize: 0,
				value: []
			};
		}

		const result = Object.entries(source).map(item => ({ code: item[0], name: item[1] } as LanguageItem));
		return {
			totalSize: result.length,
			value: result
		};
	}
}
