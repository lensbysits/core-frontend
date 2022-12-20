import { Injectable } from "@angular/core";

import { ILoggerMessage } from "../interfaces";

@Injectable({
	providedIn: "root"
})
// @Injectable()
export class LoggerMessagesService {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() {}

	messages: ILoggerMessage[] = [];

	add(message: ILoggerMessage) {
		this.messages.push(message);
	}

	clear() {
		this.messages = [];
	}
}
