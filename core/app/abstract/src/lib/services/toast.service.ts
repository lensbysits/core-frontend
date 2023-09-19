import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable()
export class ToastService {
	constructor(private readonly messageService: MessageService) {}

	public success(title: string, message: string, messageId?: string, ttlMs = 5000) {
		this.messageService.add({
			severity: "success",
			summary: title,
			detail: message,
			id: messageId,
			life: ttlMs
		});
	}

	public info(title: string, message: string, messageId?: string, ttlMs = 5000) {
		this.messageService.add({
			severity: "info",
			summary: title,
			detail: message,
			id: messageId,
			life: ttlMs
		});
	}

	public warn(title: string, message: string, messageId?: string, ttlMs = 5000) {
		this.messageService.add({
			severity: "warn",
			summary: title,
			detail: message,
			id: messageId,
			life: ttlMs
		});
	}

	public error(title: string, message: string, messageId?: string, ttlMs = 5000) {
		this.messageService.add({
			severity: "error",
			summary: title,
			detail: message,
			id: messageId,
			life: ttlMs
		});
	}

	public custom(title: string, message: string, icon: string, messageId?: string, ttlMs = 5000) {
		this.messageService.add({
			severity: "custom",
			summary: title,
			detail: message,
			icon: icon,
			id: messageId,
			life: ttlMs
		});
	}
}
