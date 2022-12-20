import { Component } from "@angular/core";
import { LoggerMessagesService } from "../../core/services";

@Component({
	selector: "lens-logger-messages",
	templateUrl: "./logger-messages.component.html",
	styleUrls: ["./logger-messages.component.scss"]
})
export class LoggerMessagesComponent {
	constructor(public readonly logger: LoggerMessagesService) {}
}
