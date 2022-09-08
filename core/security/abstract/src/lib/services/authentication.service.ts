import { Observable } from "rxjs";

export abstract class AuthenticationService {
    abstract login(): void;
    abstract logout(): void;
    abstract isAuthenticated$: Observable<boolean>;
}