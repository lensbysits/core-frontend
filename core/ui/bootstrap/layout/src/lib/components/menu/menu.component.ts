import { Component } from "@angular/core";
import { MenuItem, MenuService } from "@lens/app-abstract";
import { Observable } from "rxjs";

@Component({
	selector: "ui-menu",
	template: `
		<ul
			id="sidebarnav"
			class="pt-4">
			<li
				ui-menuitem
				*ngFor="let item of menuModel$ | async; let i = index"
				class="sidebar-item"
				routerLinkActive="selected"
				[item]="item"
				[index]="i"
				[root]="true"></li>
		</ul>
	`
})
export class AppMenuComponent {
	menuModel$: Observable<MenuItem[]>;

	constructor(private readonly menuService: MenuService) {
		this.menuModel$ = this.menuService.getMenuItems();
	}
}
