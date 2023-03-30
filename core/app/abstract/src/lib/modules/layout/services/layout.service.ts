import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type SidebarType = "full" | "mini-sidebar";

@Injectable({
	providedIn: "root"
})
export class LayoutService {
	private sidebarType$ = new BehaviorSubject<SidebarType>("mini-sidebar");
	SidebarType$ = this.sidebarType$.asObservable();

	get SidebarType(): SidebarType {
		return this.sidebarType$.value;
	}
	set SidebarType(value: SidebarType) {
		this.sidebarType$.next(value);
	}
}
