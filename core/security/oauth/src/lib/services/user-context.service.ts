import { Injectable } from "@angular/core";
import { DefaultUserContextService } from "@lens/app-abstract";
import { EventTypes, PublicEventsService } from "angular-auth-oidc-client";
import { filter, takeUntil } from "rxjs";

@Injectable()
export class UserContextService extends DefaultUserContextService {

    
    constructor(publicEventsService: PublicEventsService) {
        super();
        publicEventsService.registerForEvents().pipe(
            filter(notification => 
                notification.type === EventTypes.CheckingAuthFinished ||
                notification.type === EventTypes.CheckingAuthFinishedWithError ||
                notification.type === EventTypes.UserDataChanged),
            takeUntil(this.destroy$)
          )
          .subscribe(notification => {
            console.log(notification);
            
            const isAuthenticated = notification.value?.isAuthenticated;
            const userData = notification.value?.userData;

            super.Set(userData, isAuthenticated);
          });
    }
}