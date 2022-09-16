import { Injectable, Inject } from '@angular/core';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { APP_INFO, AppInfo } from '../../app-info';
import { UserContextService } from '../../user-context';
import { MenuItem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private allMenuItems: MenuItem[] = [];
  private menuItems$ = new BehaviorSubject<MenuItem[]>(this.allMenuItems);

  constructor(@Inject(APP_INFO) private appInfo: AppInfo, private userContext: UserContextService) {
    // Whenever something changes in the UserContext, refresh the menu by refiltering the menuItems.
    //TODO: Make the filter work again
    userContext.Changed$.subscribe(() => this.menuItems$.next(this.allMenuItems.filter(this.filter, this)));
    userContext.Changed$.subscribe(() => this.menuItems$.next(this.allMenuItems));
  }

  addMenuItems(menuItems: MenuItem | MenuItem[]): void {
    if (Array.isArray(menuItems))
      this.allMenuItems.push(...menuItems);
    else
      this.allMenuItems.push(menuItems);

    //TODO: Make the filter work again
    this.menuItems$.next(this.allMenuItems);
    // this.menuItems$.next(this.allMenuItems.filter(this.filter, this));
  }

  getMenuItems(): Observable<MenuItem[]> {
    return this.menuItems$;
  }

  public get isEmpty(): Observable<boolean> {
    return this.getMenuItems().pipe(map(menuItems => menuItems.length == 0));
  }

  filter(navItem: MenuItem): MenuItem | null {
    // if environment-filter is false, don't show
    if (navItem.envfilter && navItem.envfilter?.indexOf(this.appInfo.environment ?? '') < 0) {
      return null;
    }

    // if claim-filter is false, don't show
    if (navItem.claimfilter && !navItem.claimfilter.some(claim => this.userContext.HasClaim(claim))) {
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
    if (navItem.unauthorizedonly && this.userContext.IsAuthenticated) {
      return null;
    }

    // filter possible sub-menu items
    if (navItem.items) {
      navItem.items = navItem.items.filter(this.filter, this);
    }

    // show the menu-item
    return navItem;
  }
}
