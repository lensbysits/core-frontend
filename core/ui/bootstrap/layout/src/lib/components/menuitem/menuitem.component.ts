import { Component, Input, OnChanges } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from "@lens/app-abstract";
import { MenuService } from "../../services";

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: "ui-menuitem",
	template: `
		<li
			class="sidebar-item"
			[ngClass]="{ selected: root && isSelected, active: !root && isSelected }">
			<ng-container *ngIf="item">
				<a
					class="sidebar-link waves-effect waves-dark"
					[ngClass]="getItemCssClass(item)"
					[id]="item.id"
					[routerLink]="item.routerLink"
					[attr.href]="item.url"
					[attr.target]="item.target"
					[attr.tabindex]="0"
					[attr.aria-expanded]="isExpanded"
					(click)="itemClick($event)">
					<i [class]="item.icon"></i>
					<span class="hide-menu">
						{{ item.label }} {{ showNbSubItems(item) }}
					</span>
				</a>
				<ul
					*ngIf="item.items as submenu"
					class="collapse"
					[ngClass]="getSubmenuCssClass()"
					[attr.aria-expanded]="isExpanded">
					<ui-menuitem
						*ngFor="let subitem of submenu; let i = index"
						[item]="subitem"
						[index]="i"
						[level]="level + 1"
						[selectedNode]="selectedNode"></ui-menuitem>
				</ul>
			</ng-container>
		</li>
	`
})
export class AppMenuitemComponent implements OnChanges {
	@Input() item!: MenuItem;
	@Input() index = 0;
	@Input() root = false;
	@Input() selectedNode!: MenuItem;
	@Input() level = 1;

	isSelected = false;
	isExpanded = false;
	isInited = false;

	constructor(
		private readonly router: Router,
		private readonly menuService: MenuService
	) {}

	ngOnChanges() {
		if (this.selectedNode) {
			this.setNodeInfo(
				this.menuService.checkNodeIdExists(
					this.item,
					this.selectedNode.id ?? ""
				)
			);
		}
		//this.setExpandCollapseStatus();
	}

	setNodeInfo(isFound: boolean): void {
		if (isFound) {
			if (!this.isInited) {
				this.isExpanded = true;
			}
			this.isSelected = this.selectedNode.items === undefined;
		} else {
			this.isSelected = false;
			this.isExpanded = false;
		}
	}

	itemClick(event: Event): void {
		// avoid processing disabled items
		if (this.item?.disabled || !event.currentTarget) {
			event.preventDefault();
			return;
		}

		// execute command
		if (this.item?.command) {
			this.item?.command({ originalEvent: event, item: this.item });
		}

		this.isExpanded = !this.isExpanded;
		this.isInited = true;
	}

	showNbSubItems(item: MenuItem) {
		const len = item.items?.length;
		return len ? `(${len})` : "";
	}

	getItemCssClass(item: MenuItem) {
		const css = [];
		item.class && css.push(item.class);
		item.items && css.push("has-arrow");
		return css.join(" ");
	}

	getSubmenuCssClass() {
		const css = [];
		css.push(`submenu-level-${this.level}`);
		this.isExpanded && css.push("in");
		return css.join(" ");
	}
}
