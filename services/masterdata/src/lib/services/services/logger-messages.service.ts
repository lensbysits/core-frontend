import { Injectable } from '@angular/core';

import { ILoggerMessage } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
// @Injectable()
export class LoggerMessagesService {
  constructor() {}

  messages: ILoggerMessage[] = [];

  add(message: ILoggerMessage) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
