import { Component, OnInit } from "@angular/core";
import { LoggerMessagesService } from "../../core/services";

@Component({
	selector: "logger-messages",
	templateUrl: "./logger-messages.component.html",
	styleUrls: ["./logger-messages.component.scss"]
})
export class LoggerMessagesComponent implements OnInit {
	constructor(public readonly logger: LoggerMessagesService) {}

	// eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
	ngOnInit(): void {}
}
