import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'frontend-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss'],
})
export class FullLayoutComponent implements OnInit {
  title = 'console';
  isAuthenticated = false;
  constructor(public oidcSecurityService: OidcSecurityService) {}

  ngOnInit() { 
    this.oidcSecurityService.isAuthenticated$.subscribe(a => this.isAuthenticated = a.isAuthenticated);
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }
}