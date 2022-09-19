import { Injectable, OnDestroy } from '@angular/core';
import { AuthenticationService } from '@lens/security-abstract';
import { MsalBroadcastService, MsalService } from "@azure/msal-angular";
import { InteractionStatus } from "@azure/msal-browser";
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MSalAuthenticationService implements AuthenticationService, OnDestroy {
  private destroy$ = new Subject<void>();

  isAuthenticated$ = new Subject<boolean>();
  userData$ = new BehaviorSubject<any>({});

  constructor(
    private readonly msalAuthenticationService: MsalService,
    private readonly authenticationBroadcastService: MsalBroadcastService) {
    this.authenticationBroadcastService.inProgress$
      .pipe(
        filter(status => status === InteractionStatus.None),
        takeUntil(this.destroy$)
      )
      .subscribe(_ => {
        this.setLoginDisplay()
      });
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

  login(): void {
    this.msalAuthenticationService.loginRedirect();
  }
  logout(): void {
    this.msalAuthenticationService.logoutRedirect();
  }

  private setLoginDisplay() {
    const accounts = this.msalAuthenticationService.instance.getAllAccounts();
    this.isAuthenticated$.next(accounts.length > 0);
    if (accounts.length === 1) {
      this.userData$.next({ username: accounts[0].name });
    } else {
      if (accounts.length > 1) {
        console.log("Handle multiple logged in accounts");
      }
      const username = accounts.map(a => a.name).join(', ');
      this.userData$.next({ username: username });
    }
  }
}
