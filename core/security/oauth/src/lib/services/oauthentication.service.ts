import { Injectable } from "@angular/core";
import { UserData } from "@lens/app-abstract";
import { AuthenticationService } from "@lens/security-abstract";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { map, Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class OAuthenticationService implements AuthenticationService {
	isAuthenticated$!: Observable<boolean>;
	userData$: Observable<UserData> = new Observable<UserData>();

	constructor(private oidcSecurityService: OidcSecurityService) {
		this.isAuthenticated$ = oidcSecurityService.isAuthenticated$.pipe(
			map((authenticatedResult) => authenticatedResult.isAuthenticated)
		);
		this.userData$ = oidcSecurityService.userData$.pipe(
			map((userDataResult) => userDataResult.userData)
		);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getAccessToken(resource: string): Promise<string> {
		throw new Error("Method not implemented.");
	}

	login(): void {
		this.oidcSecurityService.authorize();
	}
	logout(): void {
		this.oidcSecurityService.logoff();
	}
}
