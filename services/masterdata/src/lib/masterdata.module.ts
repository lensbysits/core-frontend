import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LanguageService, MenuService, MultilingualModule } from "@lens/app-abstract";
import { AppAbstractUiModule, AppComponent } from "@lens/app-abstract-ui";
import { PrimeComponentsModule } from "@lens/ui-prime-components";
import { AngJsoneditorModule } from "@maaxgr/ang-jsoneditor";

import { menu } from "./app-menu";
import { masterdataRoutes } from "./app-routes";
import {
	MasterdataAlternativeKeyAddComponent,
	MasterdataAlternativeKeyComponent,
	MasterdataAlternativeKeyListComponent,
	MasterdataDashboardComponent,
	MasterdataRelatedItemsAddNewItemsComponent,
	MasterdataRelatedItemsBoxTypeChooseRelatedComponent,
	MasterdataRelatedItemsComponent,
	MasterdataRelatedItemsListByTypeComponent,
	MasterdataRelatedItemsListItemsComponent,
	MasterdataRelatedItemsSelectTypeComponent,
	MasterdataRelatedItemsViewOnlyComponent,
	MasterdataTranslationComponent,
	MasterdataTranslationListComponent,
	MasterdataTypeDetailsComponent,
	MasterdataTypeEditFormComponent,
	MasterdataTypeListComponent,
	MasterdatasDetailsComponent,
	MasterdatasEditFormComponent,
	MasterdatasListComponent
} from "./components";
import { MasterdataServicesModule } from "./core/services";
import {
	MasterdataAlternativeKeyDomainSelectorModule,
	MasterdataItemsSelectorModule,
	MasterdataTypeSelectorModule,
	TagsSelectorModule
} from "./core/ui";

const components = [
	MasterdataAlternativeKeyAddComponent,
	MasterdataAlternativeKeyComponent,
	MasterdataAlternativeKeyListComponent,
	MasterdataDashboardComponent,
	MasterdataRelatedItemsAddNewItemsComponent,
	MasterdataRelatedItemsBoxTypeChooseRelatedComponent,
	MasterdataRelatedItemsComponent,
	MasterdataRelatedItemsListByTypeComponent,
	MasterdataRelatedItemsListItemsComponent,
	MasterdataRelatedItemsSelectTypeComponent,
	MasterdataRelatedItemsViewOnlyComponent,
	MasterdataTranslationComponent,
	MasterdataTranslationListComponent,
	MasterdataTypeDetailsComponent,
	MasterdataTypeEditFormComponent,
	MasterdataTypeListComponent,
	MasterdatasDetailsComponent,
	MasterdatasEditFormComponent,
	MasterdatasListComponent
];

@NgModule({
	imports: [
		CommonModule,
		AppAbstractUiModule,
		AngJsoneditorModule,
		FormsModule,
		ReactiveFormsModule,
		PrimeComponentsModule,
		MasterdataItemsSelectorModule,
		MasterdataTypeSelectorModule,
		TagsSelectorModule,
		MasterdataAlternativeKeyDomainSelectorModule,
		RouterModule.forChild(masterdataRoutes),
		MasterdataServicesModule.forRoot(),
		MultilingualModule.forChild("masterdata")
	],
	declarations: [...components],
	exports: [MasterdataItemsSelectorModule, MasterdataTypeSelectorModule, TagsSelectorModule, MasterdataAlternativeKeyDomainSelectorModule],
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
