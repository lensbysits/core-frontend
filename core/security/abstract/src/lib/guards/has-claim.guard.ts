import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserContextService } from "@lens/app-abstract";

@Injectable()
export class HasClaimGuard implements CanActivate {
    constructor (
        private readonly userContextService: UserContextService
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, warn = true): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const claims = route.data["authorization"].claims;
        const result = this.hasRequiredClaim(claims);
        if (!result && warn) console.warn("Could not activate route", route, "because the requested claims", claims, "did not match any of the available claims", this.userContextService.UserData.Claims);
        return result;
    }

    private hasRequiredClaim(claims: string[]) {
        let found = false;
        for (const claim in claims) {
            found = this.userContextService.HasClaim(claim);
            if (found) break;
        }
        return found;
    }
}