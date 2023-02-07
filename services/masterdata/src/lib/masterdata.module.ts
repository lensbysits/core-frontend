import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AngJsoneditorModule } from "@maaxgr/ang-jsoneditor";
import { LanguageService, MenuService, MultilingualModule } from "@lens/app-abstract";
import { AppAbstractUiModule, AppComponent } from "@lens/app-abstract-ui";
import { PrimeComponentsModule } from "@lens/ui-prime-components";

import { MasterdataTypeSelectorModule, TagsSelectorModule } from "./core/ui";
import { MasterdataApiClientsModule } from "./core/services";
import {
	MasterdataDashboardComponent,
	MasterdatasDetailsComponent,
	MasterdatasEditFormComponent,
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
		HttpClientModule,
		PrimeComponentsModule,
		MasterdataTypeSelectorModule,
		TagsSelectorModule,
		RouterModule.forChild(masterdataRoutes),
		MasterdataApiClientsModule.forRoot(),
		MultilingualModule.forChild("masterdata")
	],
	declarations: [...components],
	exports: [MasterdataTypeSelectorModule, TagsSelectorModule],
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
