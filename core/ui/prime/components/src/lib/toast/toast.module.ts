import { NgModule } from "@angular/core";
import { MessageService } from "primeng/api";
import { ToastModule as PrimeToastModule } from "primeng/toast";
import { ToastComponent } from "./toast.component";
import { ToastService } from "./toast.service";

// Force MessageService to be a singleton: https://stackoverflow.com/a/40160079
// Services are no longer singleton when loaded in lazy loaded modules.
(<any>window).messageService = new MessageService();

@NgModule({
    imports: [
        PrimeToastModule
    ],
    declarations: [
        ToastComponent
    ],
    providers: [
        ToastService,
        { provide: MessageService, useValue: (<any>window).messageService }
    ],
    exports: [
        ToastComponent
    ]
})
export class ToastModule { }