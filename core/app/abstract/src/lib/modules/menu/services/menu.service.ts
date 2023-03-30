import { Injectable, Inject, Optional } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { map, Observable, BehaviorSubject } from "rxjs";
import { APP_INFO, AppInfo } from "../../app-info";
import { UserContextService } from "../../user-context";
import { MenuItem } from "../models";

@Injectable({
	providedIn: "root"
})
export class MenuService {
	private allMenuItems: MenuItem[] = [];
	private menuItems$ = new BehaviorSubject<MenuItem[]>(this.allMenuItems);

	constructor(
		@Inject(APP_INFO) private appInfo: AppInfo,
		@Optional() private userContext: UserContextService,
		@Optional() private translateService: TranslateService
	) {
		if (this.userContext) {
			// Whenever something changes in the UserContext, refresh the menu by refiltering the menuItems.
			userContext.changed$.subscribe(() => {
				const filteredMenuItems = this.allMenuItems.filter(this.filter, this);
				this.menuItems$.next(filteredMenuItems);
			});
		}
	}

	public addMenuItems(menuItems: MenuItem | MenuItem[]): void {
		const menus = Array.isArray(menuItems) ? menuItems : [menuItems];
		if (this.translateService) {
			this.applyTranslations(menus);
		}

		this.allMenuItems.push(...menus);

		this.menuItems$.next(this.allMenuItems.filter(this.filter, this));
	}

	public getMenuItems(): Observable<MenuItem[]> {
		return this.menuItems$;
	}

	public get isEmpty(): Observable<boolean> {
		return this.getMenuItems().pipe(map(menuItems => menuItems.length === 0));
	}

	// eslint-disable-next-line complexity
	private filter(navItem: MenuItem): MenuItem | null {
		// if environment-filter is false, don't show
		if (navItem.envfilter && navItem.envfilter?.indexOf(this.appInfo.environment ?? "") < 0) {
			return null;
		}

		if (this.userContext) {
			// if claim-filter is false, don't show
			if (navItem.claimfilter && !navItem.claimfilter.some(claim => this.userContext.hasClaims(claim))) {
				return null;
			}

			// if role-filter is false, don't show
			if (navItem.rolefilter && !navItem.rolefilter.some(role => this.userContext.IsInRole(role))) {
				return null;
			}

			// if no filter and not authenticated, don't show
			if (((navItem.claimfilter?.length ?? 0) === 0 || (navItem.rolefilter?.length ?? 0) === 0) && !this.userContext.IsAuthenticated) {
				return null;
			}

			// if 'only show when NOT authenticated' but is authenticated, don't show
			if (navItem.anonymousonly && this.userContext.IsAuthenticated) {
				return null;
			}
		} else {
			if (navItem.claimfilter?.length ?? 0 >= 1) {
				return null;
			}

			if (navItem.rolefilter?.length ?? 0 >= 1) {
				return null;
			}
		}

		// filter possible sub-menu items
		if (navItem.items) {
			navItem.items = navItem.items.filter(this.filter, this);
		}

		// show the menu-item
		return navItem;
	}

	private applyTranslations(menus: MenuItem[]) {
		//flatten menu structure to easily process the translations
		const items = this.flattenMenuItems(menus);
		items.push(...menus);

		const isMultilingualMenu = items.find(i => i.translationKey !== undefined) !== undefined;
		if (!isMultilingualMenu) {
			return;
		}

		this.translateService.onLangChange.subscribe(() => this.translateMenuItems(items));

		this.translateMenuItems(items);
	}

	private flattenMenuItems(menuItems: MenuItem[], foundItems?: MenuItem[], failsave: number = 100): MenuItem[] {
		if (failsave === 0) {
			throw `Max menu dept of ${failsave} items reached`;
		}
		foundItems = foundItems ?? [];

		for (const item of menuItems) {
			foundItems.push(item);

			if (item.items) {
				this.flattenMenuItems(item.items, foundItems, failsave - 1);
			}
		}

		return foundItems;
	}

	private translateMenuItems(items: MenuItem[]) {
		for (const item of items ?? []) {
			if (!item.label && !item.translationKey) {
				throw "Label or translation key is required for a menu item";
			}

			if (item.translationKey) {
				item.label = this.translateService.instant(item.translationKey);
			}
		}
	}
}
