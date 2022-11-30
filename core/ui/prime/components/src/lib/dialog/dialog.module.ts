import { NgModule } from "@angular/core";
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogComponent } from './dialog.component';
import { AppAbstractUiModule, DialogService as LensDialogService } from '@lens/app-abstract-ui';
import { PrimeDialogService } from './dialog.service';
import { ButtonModule } from "../button";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        AppAbstractUiModule,
        DynamicDialogModule,
        ButtonModule,
        CommonModule
    ],
    declarations: [
        DialogComponent
      ],
    providers: [
        DialogService,
        { provide: LensDialogService, useClass: PrimeDialogService}
    ]
})
export class DialogModule { }