import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngJsoneditorModule } from "@maaxgr/ang-jsoneditor";
import { TabViewModule } from 'primeng/tabview';
import { LanguageService, MenuService, MultilingualModule } from "@lens/app-abstract";
import { AppAbstractUiModule, AppComponent } from "@lens/app-abstract-ui";
import { PrimeComponentsModule } from "@lens/ui-prime-components";

import { MasterdataTypeSelectorModule, TagsSelectorModule, MasterdataAlternativeKeyDomainSelectorModule } from "./core/ui";
import { MasterdataServicesModule } from "./core/services";
import {
	MasterdataDashboardComponent,
	MasterdatasDetailsComponent,
	MasterdatasEditFormComponent,
	MasterdataAlternativeKeyComponent,
	MasterdataAlternativeKeyAddComponent,
	MasterdataAlternativeKeyListComponent,
	MasterdatasListComponent,
	MasterdataTypeDetailsComponent,
	MasterdataTypeEditFormComponent,
	MasterdataTypeListComponent
} from "./components";
import { menu } from "./app-menu";
import { masterdataRoutes } from "./app-routes";

const components = [
	MasterdataDashboardComponent,
	MasterdatasDetailsComponent,
	MasterdatasEditFormComponent,
	MasterdataAlternativeKeyComponent,
	MasterdataAlternativeKeyAddComponent,
	MasterdataAlternativeKeyListComponent,
	MasterdatasListComponent,
	MasterdataTypeDetailsComponent,
	MasterdataTypeListComponent,
	MasterdataTypeEditFormComponent
];

@NgModule({
	imports: [
		CommonModule,
		AppAbstractUiModule,
		AngJsoneditorModule,
		FormsModule,
		ReactiveFormsModule,
		PrimeComponentsModule,
		MasterdataTypeSelectorModule,
		TagsSelectorModule,
		MasterdataAlternativeKeyDomainSelectorModule,
		RouterModule.forChild(masterdataRoutes),
		MasterdataServicesModule.forRoot(),
		MultilingualModule.forChild("masterdata"),
		TabViewModule
	],
	declarations: [...components],
	exports: [MasterdataTypeSelectorModule, TagsSelectorModule, MasterdataAlternativeKeyDomainSelectorModule],
	bootstrap: [AppComponent]
})
export class MasterdataModule {
	constructor(languageService: LanguageService, menuService: MenuService) {
		languageService.onTranslationsLoaded(() => {
			menuService.addMenuItems(menu);
		});
		languageService.initLanguageConfiguration();
	}
}
