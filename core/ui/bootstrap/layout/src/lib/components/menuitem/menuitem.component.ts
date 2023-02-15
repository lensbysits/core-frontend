import {
	Component,
	HostBinding,
	Input,
	OnDestroy,
	OnInit
} from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { MenuItem } from "@lens/app-abstract";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { MenuService } from "../../services";

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: "[ui-menuitem]",
	template: `
		<ng-container *ngIf="item">
			<a
				class="sidebar-link waves-effect waves-dark"
				[ngClass]="{ 'has-arrow': item.items, active: active }"
				[attr.href]="item.url"
				[routerLink]="item.routerLink"
				aria-expanded="false"
				(click)="itemClick($event)">
				<i [class]="item.icon"></i>
				<span class="hide-menu">
					{{ item.label }} {{ showNbSubItems(item) }}
				</span>
			</a>
			<ul
				*ngIf="item.items as subMenuItems"
				class="collapse first-level"
				[ngClass]="{ in: active }"
				aria-expanded="true">
				<li
					*ngFor="let subitem of subMenuItems"
					class="sidebar-item"
					routerLinkActive="selected">
					<ng-container *ngIf="subitem">
						<a
							[attr.href]="subitem.url"
							[routerLink]="subitem.routerLink"
							class="sidebar-link">
							<i [class]="subitem.icon"></i>
							<span class="hide-menu">{{ subitem.label }}</span>
						</a>
					</ng-container>
				</li>
			</ul>
		</ng-container>
	`
})
export class AppMenuitemComponent implements OnInit, OnDestroy {
	@Input() item?: MenuItem;
	@Input() index = 0;
	@Input() root = false;
	@Input() parentKey = "";

	active = false;
	menuSourceSubscription: Subscription;
	menuResetSubscription: Subscription;
	key = "";

	constructor(
		public readonly router: Router,
		private readonly menuService: MenuService
	) {
		this.menuSourceSubscription = this.menuService.menuSource$.subscribe(
			(key) => {
				// deactivate current active menu
				if (this.active && this.key !== key && key.indexOf(this.key) !== 0) {
					this.active = false;
				}
			}
		);

		this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
			this.active = false;
		});

		this.router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe(() => {
				if (this.item?.routerLink) {
					this.updateActiveStateFromRoute();
				} else {
					this.active = false;
				}
			});
	}

	@HostBinding("class.layout-root-menuitem")
	public get getLayoutRootMenuItem(): boolean {
		return this.root;
	}

	@HostBinding("class.active-menuitem")
	public get getActiveMenuItem(): boolean {
		return this.active;
	}

	@HostBinding("class.active-menuitem-notrouter")
	public get getActiveMenuItemNotRouter(): boolean {
		return this.active && !this.item?.items;
	}

	ngOnInit() {
		if (this.item?.routerLink) {
			this.updateActiveStateFromRoute();
		}

		this.key = this.parentKey
			? this.parentKey + "-" + this.index
			: String(this.index);
	}

	updateActiveStateFromRoute() {
		const routerLink =
			this.item?.routerLink && this.item?.routerLink.length > 1
				? this.item?.routerLink[0]
				: "";
		this.active = this.router.isActive(
			routerLink,
			!this.item?.items && !this.item?.preventExact
		);
	}

	itemClick(event: Event) {
		console.log(event);
		// avoid processing disabled items
		if (this.item?.disabled || !event.currentTarget) {
			event.preventDefault();
			return;
		}

		// notify other items
		this.menuService.onMenuStateChange(this.key);

		// execute command
		if (this.item?.command) {
			this.item?.command({ originalEvent: event, item: this.item });
		}

		// toggle active state
		if (this.item?.items) {
			this.active = !this.active;
		} else {
			// activate item
			this.active = true;

			const ink = this.getInk(event.currentTarget as HTMLElement);
			if (ink) {
				this.removeClass(ink, "p-ink-active");
			}
		}
	}

	getInk(element: HTMLElement): Element | null {
		// tslint:disable-next-line:prefer-for-of
		for (let i = 0; i < element.children.length; i++) {
			if (
				typeof element.children[i].className === "string" &&
				element.children[i].className.indexOf("p-ink") !== -1
			) {
				return element.children[i];
			}
		}
		return null;
	}

	removeClass(element: Element, className: string) {
		if (element.classList) {
			element.classList.remove(className);
		} else {
			element.className = element.className.replace(
				new RegExp(
					"(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
					"gi"
				),
				" "
			);
		}
	}

	ngOnDestroy() {
		if (this.menuSourceSubscription) {
			this.menuSourceSubscription.unsubscribe();
		}

		if (this.menuResetSubscription) {
			this.menuResetSubscription.unsubscribe();
		}
	}

	showNbSubItems(item: MenuItem) {
		const len = item.items?.length;
		return len ? `(${len})` : "";
	}
}
