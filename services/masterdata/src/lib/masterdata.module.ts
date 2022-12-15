import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MenuService } from "@lens/app-abstract";
import { AppAbstractUiModule, AppComponent } from "@lens/app-abstract-ui";
import { PrimeComponentsModule } from "@lens/ui-prime-components";

import { MasterdataTypeSelectorModule } from "./core/ui";
import { MasterdataApiClientsModule } from "./core/services";
import {
	LoggerMessagesComponent,
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
	LoggerMessagesComponent,
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
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		PrimeComponentsModule,
		MasterdataTypeSelectorModule,
		RouterModule.forChild(masterdataRoutes),
		MasterdataApiClientsModule.forRoot()
	],
	declarations: [...components],
	exports: [MasterdataTypeSelectorModule],
	bootstrap: [AppComponent]
})
export class MasterdataModule {
	constructor(menuService: MenuService) {
		menuService.addMenuItems(menu);
	}
}
