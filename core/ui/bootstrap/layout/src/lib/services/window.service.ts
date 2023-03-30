import { Injectable } from "@angular/core";
import {
	debounceTime,
	fromEvent,
	map,
	startWith,
	throttleTime
} from "rxjs";

@Injectable()
export class WindowService {
	private miniSidebarWidth = 1170;

	get windowRef() {
		return window;
	}

	get screenWidth() {
		return window.innerWidth;
	}

	get screenHeight() {
		return window.innerHeight;
	}

	isMiniSidebar$ = fromEvent(window, "resize").pipe(
		startWith(window),
		map(() => window),
		throttleTime(500),
		debounceTime(250),
		map((window: Window) => {
			return window.innerWidth < this.miniSidebarWidth;
		})
	);
}
