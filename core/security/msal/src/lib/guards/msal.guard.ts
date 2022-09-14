import { Location } from "@angular/common";
import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MsalBroadcastService, MsalGuard as OriginalMsalGuard, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { Observable } from 'rxjs';

@Injectable()
export class MsalGuard implements CanActivate, CanActivateChild, CanLoad {
    private originalGuard = new OriginalMsalGuard(this.msalGuardConfig, this.msalBroadcastService, this.authService, <any>this.location, this.router);

    constructor(
        @Inject(MSAL_GUARD_CONFIG) private readonly msalGuardConfig: MsalGuardConfiguration,
        private readonly msalBroadcastService: MsalBroadcastService,
        private readonly authService: MsalService,
        private readonly location: Location,
        private readonly router: Router
    ) { }

    canLoad(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.originalGuard.canLoad();
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.originalGuard.canActivateChild(childRoute, state);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.originalGuard.canActivate(route, state);
    }
}