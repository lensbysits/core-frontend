import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'lens-authentication-redirect',
  template: '<p>Checking authentication status!</p>',
  styles: [],
})
export class AuthenticationRedirectComponent implements OnInit {
  constructor(private oidcSecurityService: OidcSecurityService) {}

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe();
  }
}
