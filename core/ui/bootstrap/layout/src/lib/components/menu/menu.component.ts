import { Component, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { MenuItem, MenuService as MenuServiceApp } from "@lens/app-abstract";
import { filter, Subject, Subscription } from "rxjs";
import { MenuService } from "../../services";

@Component({
	selector: "ui-menu",
	template: `
		<ul
			id="sidebarnav"
			class="pt-4">
			<ng-container *ngFor="let item of menuModel$ | async; let i = index">
				<ui-menuitem
					[item]="item"
					[index]="i"
					[root]="true"
					[level]="1"
					[selectedNode]="selectedNode"></ui-menuitem>
			</ng-container>
		</ul>
	`
})
export class AppMenuComponent implements OnInit, OnChanges, OnDestroy {
	private menuModel = new Subject<MenuItem[]>();
	menuModel$ = this.menuModel.asObservable();

	private subscriptions: Subscription[] = [];
	selectedNode!: MenuItem;

	constructor(
		private readonly router: Router,
		private readonly menuServiceApp: MenuServiceApp,
		private readonly menuService: MenuService
	) {
		this.menuModel$ = this.menuServiceApp.getMenuItems();
	}

	ngOnChanges() {
		this.checkMenuValidity();
	}

	ngOnInit() {
		this.checkMenuValidity();

		this.router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe((event) => {
				if (event instanceof NavigationEnd) {
					this.setSelectedNodeFromRoute(event.urlAfterRedirects);
				}
			});

		this.setSelectedNodeFromRoute(this.router.url);
	}

	ngOnDestroy() {
		this.subscriptions.forEach((subscription) => subscription.unsubscribe());
	}

	private setSelectedNodeFromRoute(url: string): void {
		const subscription = this.menuModel$.subscribe((menuItems) => {
			const nodeFound = this.menuService.getNodeByRoute(menuItems, url);
			if (
				nodeFound !== undefined &&
				nodeFound.routerLink &&
				nodeFound.routerLink.length
			) {
				this.selectedNode = nodeFound;
			}
		});
		this.subscriptions.push(subscription);
	}

	private checkMenuValidity(): void {
		const subscription = this.menuModel$.subscribe((menuItems) => {
			this.menuService.setNodeId(menuItems);
			this.menuModel.next(menuItems);
		});
		this.subscriptions.push(subscription);
	}
}
