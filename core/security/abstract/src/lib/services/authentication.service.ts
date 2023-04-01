import { UserData } from "@lens/app-abstract";
import { Observable } from "rxjs";

export abstract class AuthenticationService {
    abstract login(): void;
    abstract logout(): void;
    abstract isAuthenticated$: Observable<boolean>;
    abstract userData$: Observable<UserData>;
    async getAccessToken(resource: string): Promise<string> { return new Promise<string>(() => ''); };
}
