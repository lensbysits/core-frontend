import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Route, UrlSegment } from "@angular/router";
import { Observable } from "rxjs";
import { AuthGuard } from "./auth.guard";

@Injectable()
export class DefaultAuthGuard extends AuthGuard {
    constructor() {
        super();
    }

    override canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log('can canActivate from DefaultAuthGuard');
        return true;
    }
}