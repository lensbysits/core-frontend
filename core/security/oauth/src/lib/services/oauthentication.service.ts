import { Injectable } from '@angular/core';
import { AuthenticationService } from '@lens/security-abstract';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OAuthenticationService implements AuthenticationService {
  
  isAuthenticated$!: Observable<boolean>;

  constructor(private oidcSecurityService: OidcSecurityService) { 
    this.isAuthenticated$ = oidcSecurityService.isAuthenticated$.pipe(map(authenticatedResult => authenticatedResult.isAuthenticated ));
  }
  
  login(): void {
    this.oidcSecurityService.authorize();
  }
  logout(): void {
    this.oidcSecurityService.logoff();
  }
  
}
