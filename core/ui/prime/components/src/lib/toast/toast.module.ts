import { NgModule } from "@angular/core";
import { MessageService } from "primeng/api";
import { ToastModule as PrimeToastModule } from "primeng/toast";
import { ToastComponent } from "./toast.component";
import { ToastService } from "./toast.service";

@NgModule({
    imports: [
        PrimeToastModule
    ],
    declarations: [
        ToastComponent
    ],
    providers: [
        ToastService,
        MessageService
    ],
    exports: [
        ToastComponent
    ]
})
export class ToastModule { }