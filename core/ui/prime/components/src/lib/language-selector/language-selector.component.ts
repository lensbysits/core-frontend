import { Component, OnInit, Renderer2 } from "@angular/core";
import { LanguageService } from "@lens/app-abstract";
import { TranslateService } from "@ngx-translate/core";

@Component({
	selector: "lens-language-selector",
	templateUrl: "./language-selector.component.html"
})
export class LanguageSelectorComponent implements OnInit {
	public languages!: ILanguage[];
	public selectedLanguage!: ILanguage;
	public translationsLoaded = false;
	private rtlLanguages = ["ar", "he", "fa", "ur"];

	constructor(private translateService: TranslateService, private languageService: LanguageService, private renderer: Renderer2) {}

	public ngOnInit(): void {
		this.languageService.onTranslationsLoaded(() => {
			this.translationsLoaded = true;

			this.createAvailableLanguageList();
			const curLang = this.languages.find(l => l.value === this.translateService.currentLang);
			if (curLang) {
				this.selectedLanguage = curLang;
			}
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onLanguageChanged(item: any) {
		const lang = item.value ?? "";
		if (this.translateService.getLangs().indexOf(lang.value) !== -1) {
			this.translateService.use(lang.value).subscribe(() => {
				this.createAvailableLanguageList();
				this.setReadDirection(lang.value);
			});
		}
	}

	private setReadDirection(lang: any) {
		if(!this.languageService.rtlStylesheetLocation && this.rtlLanguages.includes(lang)){
			console.error("No RTL stylesheet location is defined in the app configuration");	
			return;
		}

		if (this.rtlLanguages.includes(lang)) {
			const link = this.renderer.createElement("link");
			link.rel = "stylesheet";
			link.href = this.languageService.rtlStylesheetLocation;
			this.renderer.appendChild(document.head, link);
		} else {
			const links = document.getElementsByTagName("link");
			for (let i = 0; i < links.length; i++) {
				const link = links[i];
				if (link.href.includes(this.languageService.rtlStylesheetLocation ?? '')) {
					this.renderer.removeChild(document.head, link);
				}
			}
		}
	}

	private createAvailableLanguageList() {
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