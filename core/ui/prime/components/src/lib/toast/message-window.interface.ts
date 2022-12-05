import { MessageService } from "primeng/api";

export interface MessageWindow extends Window {
    messageService: MessageService
}