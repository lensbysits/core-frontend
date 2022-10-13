import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserContextService } from "@lens/app-abstract";

@Injectable()
export class HasRoleGuard implements CanActivate {
    constructor (
        private readonly userContextService: UserContextService
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, warn = true): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const roles = route.data["authorization"].roles;
        const result = this.hasRequiredRole(roles);
        if (!result && warn) console.warn("Could not activate route", route, "because the requested roles", roles, "did not match any of the available roles", this.userContextService.UserData.Roles);
        return result;
    }

    private hasRequiredRole(roles: string[]) {
        let found = false;
        for (let role in roles) {
            found = this.userContextService.IsInRole(role);
            if (found) break;
        }
        return found;
    }
}