import { Claim, UserData } from '../models';
import { Observable } from 'rxjs';

export abstract class UserContextService {
  abstract changed$: Observable<void>;
  abstract userData$: Observable<UserData>;
  abstract get UserData(): UserData;
  abstract isAuthenticated$: Observable<boolean>;

  abstract get IsAuthenticated(): boolean;
  abstract IsInRole$(role: string): Observable<boolean>;
  abstract IsInRole(role: string): boolean;
  abstract hasClaims$(claims: Claim | Claim[]): Observable<boolean>;
  abstract hasClaims(claims: Claim | Claim[]): boolean;
  abstract addClaims(claims: Claim[]): void;
}
