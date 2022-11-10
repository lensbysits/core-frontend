import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable()
export class ToastService {
    constructor (
        private readonly messageService: MessageService
    ) {}

    public success(title:string, message: string) {
        this.messageService.add({ severity: "success", summary: title, detail: message });
    }

    public info(title:string, message: string) {
        this.messageService.add({ severity: "info", summary: title, detail: message });
    }

    public warn(title:string, message: string) {
        this.messageService.add({ severity: "warn", summary: title, detail: message });
    }

    public error(title:string, message: string) {
        this.messageService.add({ severity: "error", summary: title, detail: message });
    }

    public custom(title:string, message: string, icon: string) {
        this.messageService.add({ severity: "custom", summary: title, detail: message, icon: icon });
    }
}