import { Injectable, Optional } from "@angular/core";
import {
	AdditionalClaimsService,
	DefaultUserContextService,
	UserData
} from "@lens/app-abstract";
import { AuthenticationService } from "@lens/security-abstract";
import { takeUntil } from "rxjs";

@Injectable()
export class UserContextService extends DefaultUserContextService {
	constructor(
		authenticationService: AuthenticationService,
		@Optional() additionalClaimsService: AdditionalClaimsService
	) {
		super(additionalClaimsService);
		authenticationService.userData$
			.pipe(takeUntil(this.destroy$))
			.subscribe((userData) => {
				const uData: UserData = {
					Username: userData?.name,
					Roles: userData?.role,
					Claims: [
						{ name: "app", value: userData?.app ?? "" },
						{ name: "personid", value: userData?.personid ?? "" },
						{ name: "sub", value: userData?.sub ?? "" },
						{
							name: "preferred_username",
							value: userData?.preferred_username ?? ""
						},
						{ name: "email_verified", value: userData?.email_verified ?? "" }
					]
				};
				super.Set(uData, super.IsAuthenticated);
			});

		authenticationService.isAuthenticated$
			.pipe(takeUntil(this.destroy$))
			.subscribe((isAuthenticated) => {
				super.Set({}, isAuthenticated);
			});
	}
}
