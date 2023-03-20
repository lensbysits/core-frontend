import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import {
	AppConfigurationModule,
	AppInfoModule,
	LayoutModule,
	MenuModule,
	MultilingualModule,
	UserContextModule
} from "./modules";
import { ErrorHandlerService } from "./services";

const libraryModules = [
	AppInfoModule,
	MenuModule,
	LayoutModule,
	UserContextModule,
	AppConfigurationModule
];

@NgModule({
	imports: [CommonModule, HttpClientModule, MultilingualModule, ...libraryModules],
	exports: libraryModules,
	providers: [{ provide: ErrorHandler, useExisting: ErrorHandlerService }]
})
export class AppAbstractModule {}
