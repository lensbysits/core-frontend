import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of, tap } from "rxjs";
import { UserContextService } from "@lens/app-abstract";

@Injectable()
export class HasClaimGuard implements CanActivate, CanActivateChild {
    constructor (
        private readonly userContextService: UserContextService
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, warn = true): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return this.hasRequiredClaims$(route, warn);
    }

	public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot, warn = true): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.hasRequiredClaims$(childRoute, warn);
	}

    private hasRequiredClaims$(route: ActivatedRouteSnapshot, warn = true): Observable<boolean> {
        const claims = route.data["authorization"]?.claims;
		if (!claims) {
			return of(true);
		}

        return this.userContextService.hasClaims$(claims).pipe(
			tap(result => {
				if (!result && warn) console.warn("Could not activate route", route, "because the requested claims", claims, "did not match any of the available claims", this.userContextService.UserData.Claims)
			})
		);
	}
}