import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

type Entries<T> = {
	[K in keyof T]: [K, T[K]];
}[keyof T][];

@Injectable()
export class MasterdataRendererService {
	constructor(private readonly translateService: TranslateService) {}

	prepareForDisplay<T extends object>(item: T, translationKey: string): Entries<T> {
		// "metadata" model field will have a special display!
		const res = (Object.entries(item) as Entries<T>).filter(item => !["metadata", "masterdataKeysCount", "translation"].includes(item[0] as string));
		res.forEach(item => {
			item[0] = this.translateService.instant(`masterdatamgmt.pages.${translationKey}.modelFields.${item[0].toString()}`);
		});
		return res;
	}

	titleCase(str: string) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
}
