import { Injectable, Optional } from "@angular/core";
import { MsalBroadcastService, MsalService } from "@azure/msal-angular";
import { InteractionStatus } from "@azure/msal-browser";
import { AdditionalClaimsService, DefaultUserContextService } from "@lens/app-abstract";
import { filter, takeUntil } from "rxjs";

@Injectable()
export class UserContextService extends DefaultUserContextService {

    
    constructor(
      msalAuthenticationService: MsalService,
      private readonly authenticationBroadcastService: MsalBroadcastService,
      @Optional() additionalClaimsService: AdditionalClaimsService
	) {
        super(additionalClaimsService);
        this.authenticationBroadcastService.inProgress$
      .pipe(
        filter(status => status === InteractionStatus.None),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        const accounts = msalAuthenticationService.instance.getAllAccounts();
        const isAuthenticated = accounts.length > 0;
        const username = accounts.map(a => a.name).join(', ');
        const userData = { Username: username };

        super.Set(userData, isAuthenticated);
      });
    }
}