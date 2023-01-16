import { Component } from "@angular/core";

@Component({
	selector: "frontend-unauthorized",
	templateUrl: "./unauthorized.component.html",
	styleUrls: ["./unauthorized.component.scss"]
})
export class UnauthorizedComponent {
	public message: string;
	public values?: unknown[];

	constructor() {
		this.message = "UnauthorizedComponent constructor";
	}
}
