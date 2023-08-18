import { Injectable, Optional } from "@angular/core";
import { MsalBroadcastService, MsalService } from "@azure/msal-angular";
import { AccountInfo, InteractionStatus } from "@azure/msal-browser";
import { AdditionalClaimsService, DefaultUserContextService, UserData } from "@lens/app-abstract";
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
				const username = accounts.map(a => a.name).join(", ");
				const userid = accounts.map(a => this.getUserId(a)).join("||");
				const userData: UserData = { Username: username, Userid: userid };

				super.Set(userData, isAuthenticated);
			});
	}

	private getUserId(account: AccountInfo) {
		return account.localAccountId ? account.localAccountId : account.idTokenClaims?.oid ?? "";
	}
}
