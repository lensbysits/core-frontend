import { Injectable } from '@angular/core';
import { AuthenticationService } from '@lens/security-abstract';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OAuthenticationService implements AuthenticationService {
  
  isAuthenticated$!: Observable<boolean>;
  userData$: Observable<any> = new Observable<any>();

  constructor(private oidcSecurityService: OidcSecurityService) { 
    this.isAuthenticated$ = oidcSecurityService.isAuthenticated$.pipe(map(authenticatedResult => authenticatedResult.isAuthenticated ));
    this.userData$ = oidcSecurityService.userData$.pipe(map(userDataResult => userDataResult.userData));
  }
  
  login(): void {
    this.oidcSecurityService.authorize();
  }
  logout(): void {
    this.oidcSecurityService.logoff();
  }
  
}
