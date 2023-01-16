import { Component } from '@angular/core';
import { MsalService, MsalRedirectComponent, MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'lens-authentication-redirect',
  template: '<p *ngIf="busy">Checking authentication status!</p>',
  styles: [],
})
export class AuthenticationRedirectComponent extends MsalRedirectComponent {
  private destroy$ = new Subject<void>();
  busy = true;

  constructor(
    msalService: MsalService,
    private readonly authenticationBroadcastService: MsalBroadcastService) {

    super(msalService);
    this.authenticationBroadcastService.inProgress$
      .pipe(
        filter(status => status === InteractionStatus.None),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.busy = false;
        this.destroy$.next();
        this.destroy$.complete();
      });
  }
}
