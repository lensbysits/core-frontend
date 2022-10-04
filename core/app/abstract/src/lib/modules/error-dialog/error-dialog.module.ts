import { NgModule } from "@angular/core";
import { DialogModule } from "@lens/ui-prime-components";
import { ErrorDialogService } from "./error-dialog.service";

@NgModule({
    imports: [
        DialogModule
    ],
    providers: [
        ErrorDialogService
    ]
})
export class ErrorDialogModule { }