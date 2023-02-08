import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable()
export class ToastService {
    constructor (
        private readonly messageService: MessageService
    ) {}

    public success(title:string, message: string, ttlMs = 3000) {
        this.messageService.add({ severity: "success", summary: title, detail: message, life: ttlMs });
    }

    public info(title:string, message: string, ttlMs = 3000) {
        this.messageService.add({ severity: "info", summary: title, detail: message, life: ttlMs });
    }

    public warn(title:string, message: string, ttlMs = 3000) {
        this.messageService.add({ severity: "warn", summary: title, detail: message, life: ttlMs });
    }

    public error(title:string, message: string, ttlMs = 3000) {
        this.messageService.add({ severity: "error", summary: title, detail: message, life: ttlMs });
    }

    public custom(title:string, message: string, icon: string, ttlMs = 3000) {
        this.messageService.add({ severity: "custom", summary: title, detail: message, icon: icon, life: ttlMs });
    }
}