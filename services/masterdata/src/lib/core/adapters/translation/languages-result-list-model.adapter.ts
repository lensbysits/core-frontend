import { IAdapter, ISourceLanguagesResultList } from "../../interfaces";
import { LanguageItem, LanguagesResultList } from "../../models";

export class LanguagesResultListModelAdapter implements IAdapter<ISourceLanguagesResultList, LanguagesResultList> {
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
