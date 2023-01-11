import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
	selector: "lens-language-selector",
	templateUrl: "./language-selector.component.html",
	providers: [TranslateService]
})
export class LanguageSelectorComponent {

	constructor(
		public translateService: TranslateService
	) {
	}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public onLanguageChanged(item:any){
        const lang = item.value ?? "";
        if(this.translateService.getLangs().indexOf(lang) !== -1)
        {
            this.translateService.use(lang)
        }
    }
}
