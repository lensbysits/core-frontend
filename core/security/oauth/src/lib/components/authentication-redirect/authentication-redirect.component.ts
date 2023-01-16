import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'lens-authentication-redirect',
  template: '<p *ngIf="busy">Checking authentication status!</p>',
  styles: [],
})
export class AuthenticationRedirectComponent implements OnInit {
  private destroy$ = new Subject<void>();
  busy = true;

  constructor(private oidcSecurityService: OidcSecurityService) {}

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().pipe(
        takeUntil(this.destroy$)
    ).subscribe(() => {
      this.busy = false;
      this.destroy$.next();
      this.destroy$.complete();
    });
  }
}
