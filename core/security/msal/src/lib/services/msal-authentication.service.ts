import { Injectable, OnDestroy } from '@angular/core';
import { AuthenticationService } from '@lens/security-abstract';
import { MsalBroadcastService, MsalService } from "@azure/msal-angular";
import { AccountInfo, InteractionStatus } from "@azure/msal-browser";
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from "rxjs/operators";
import { UserData } from '@lens/app-abstract';

@Injectable({
  providedIn: 'root'
})
export class MSalAuthenticationService implements AuthenticationService, OnDestroy {
  private destroy$ = new Subject<void>();
  isAuthenticated$ = new BehaviorSubject<boolean>(false);
  userData$ = new BehaviorSubject<UserData>({});

  constructor(
    private readonly msalAuthenticationService: MsalService,
    private readonly authenticationBroadcastService: MsalBroadcastService) {
    this.authenticationBroadcastService.inProgress$
      .pipe(
        filter(status => status === InteractionStatus.None),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.setLoginDisplay()
      });
  }

  async getAccessToken(resource: string): Promise<string> {
    const result = (await this.msalAuthenticationService.instance.acquireTokenSilent({ resourceRequestUri: resource, scopes: [] })).accessToken;
    return result
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
    if (accounts.length > 0) {
      const activeAccount = accounts[0];
      this.msalAuthenticationService.instance.setActiveAccount(activeAccount);
      this.userData$.next(this.toUserData(activeAccount));
    }

    if (accounts.length > 1) {
      console.warn("Multiple logged in accounts not supported.");
    }
  }

  private toUserData(account: AccountInfo) {
    return {
      Username: account.username,
      Roles: account.idTokenClaims?.roles
    }
  }
}
