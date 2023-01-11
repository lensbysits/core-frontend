import { Component, OnInit } from "@angular/core";
import { LanguageService } from "@lens/app-abstract";
import { TranslateService } from "@ngx-translate/core";

@Component({
	selector: "lens-language-selector",
	templateUrl: "./language-selector.component.html"
})
export class LanguageSelectorComponent implements OnInit {
	public languages!: ILanguage[];
	public selectedLanguage!: ILanguage;
    public translationsLoaded = false

	constructor(
        private translateService: TranslateService, 
        private languageService: LanguageService) {}

	public ngOnInit(): void {
		this.languageService.languagesLoaded.subscribe(() => {
            this.translationsLoaded = true;

			this.createAvailableLanguageList()
            const curLang = this.languages.find(l => l.value === this.translateService.currentLang)
            if(curLang){
                this.selectedLanguage = curLang;
            }
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onLanguageChanged(item: any) {
		const lang = item.value ?? "";
		if (this.translateService.getLangs().indexOf(lang.value) !== -1) {
			this.translateService.use(lang.value);
		}

        this.createAvailableLanguageList()
	}

    private createAvailableLanguageList(){
        this.languages = [];
        for (const lang of this.translateService.getLangs()) {
            this.languages.push({
                displayName: this.translateService.instant(`availableLanguages.${lang}`),
                value: lang
            });
        }
    }
}

interface ILanguage {
	displayName: string;
	value: string;
}
