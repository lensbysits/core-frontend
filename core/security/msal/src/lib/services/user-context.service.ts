import { Injectable, Optional } from "@angular/core";
import { AdditionalClaimsService, DefaultUserContextService } from "@lens/app-abstract";
import { takeUntil } from "rxjs";
import { MSalAuthenticationService } from "./msal-authentication.service";

@Injectable()
export class UserContextService extends DefaultUserContextService {


    constructor(
      private msalAuthenticationService: MSalAuthenticationService,
      @Optional() additionalClaimsService: AdditionalClaimsService
	) {
        super(additionalClaimsService);
        this.msalAuthenticationService.userData$
       .pipe(
         takeUntil(this.destroy$)
      )
      .subscribe((userData) => {
        super.Set(userData, this.msalAuthenticationService.isAuthenticated$.value);
      });
    }
}



