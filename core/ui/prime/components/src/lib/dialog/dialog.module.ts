import { NgModule } from "@angular/core";
import { DialogService as PrimeNgDialogService, DynamicDialogModule } from "primeng/dynamicdialog";
import { ButtonModule } from "../button";
import { ComponentLoaderModule } from "@lens/app-core";
import { LensDialogService } from "./dialog.service";
import { DialogComponent } from "./dialog.component";
import { DialogService } from "@lens/app-core";

@NgModule({
    imports: [
        DynamicDialogModule,
        ButtonModule,
        ComponentLoaderModule
    ],
    providers: [
        PrimeNgDialogService,
        { provide: DialogService, useClass: LensDialogService }
    ],
    declarations: [
        DialogComponent
    ]
})
export class DialogModule { }