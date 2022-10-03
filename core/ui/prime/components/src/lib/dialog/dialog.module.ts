import { NgModule } from "@angular/core";
import { DialogService as PrimeNgDialogService, DynamicDialogModule } from "primeng/dynamicdialog";
import { ButtonModule } from "../button";
import { DialogComponent } from "./dialog.component";
import { LensDialogService } from "./dialog.service";
import { GlobalErrorDialogComponent } from "./global-error-dialog.component";
import { GlobalErrorDialogService } from "./global-error-dialog.service";
import { ComponentLoaderDirective } from "./component-loader.directive";

@NgModule({
    imports: [
        DynamicDialogModule,
        ButtonModule
    ],
    providers: [
        PrimeNgDialogService,
        LensDialogService,
        GlobalErrorDialogService
    ],
    declarations: [
        DialogComponent,
        GlobalErrorDialogComponent,
        ComponentLoaderDirective
    ]
})
export class DialogModule { }