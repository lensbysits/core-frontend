import { Component, OnInit } from "@angular/core";
import { LoggerMessagesService } from "../../core/services";

@Component({
  selector: "logger-messages",
  templateUrl: "./logger-messages.component.html",
  styleUrls: ["./logger-messages.component.scss"],
})
export class LoggerMessagesComponent implements OnInit {
  constructor(public readonly logger: LoggerMessagesService) {}

  ngOnInit(): void {}
}
