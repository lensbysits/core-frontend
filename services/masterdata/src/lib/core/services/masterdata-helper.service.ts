import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class MasterdataHelperService {
	constructor(
		private readonly translateService: TranslateService
	) {}

	prepareForDisplay<T extends object>(item: T, translationKey: string) {
		// "metadata" model field will have a special display!
		return Object.entries(item).filter(item => item[0] !== "metadata").map(item => {
			item[0] = this.translateService.instant(`masterdatamgmt.pages.${translationKey}.modelFields.${item[0]}`);
			return item;
		});
	}
}
