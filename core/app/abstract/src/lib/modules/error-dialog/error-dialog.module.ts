import { InjectionToken, NgModule } from "@angular/core";
import { DialogModule } from "@lens/ui-prime-components";
import { IErrorDialogConfiguration } from "./error-dialog-configuration.interface";
import { ErrorDialogComponent } from "./error-dialog.component";
import { ErrorDialogService } from "./error-dialog.service";

export const ERROR_DIALOG_CONFIGURATION = new InjectionToken<void>("ERROR_DIALOG_CONFIGURATION");

@NgModule({
    imports: [
        DialogModule
    ],
    providers: [
        ErrorDialogService,
        { provide: ERROR_DIALOG_CONFIGURATION, useValue: <IErrorDialogConfiguration>{ errorDialogComponent: ErrorDialogComponent } }
    ]
})
export class ErrorDialogModule {

}