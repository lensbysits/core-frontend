import { UserData } from '../models';
import { Observable } from 'rxjs';

export abstract class UserContextService {
  abstract changed$: Observable<void>;
  abstract userData$: Observable<UserData>;
  abstract get UserData(): UserData;
  abstract isAuthenticated$: Observable<boolean>;
  abstract get IsAuthenticated(): boolean;
  abstract IsInRole$(role: string): Observable<boolean>;
  abstract IsInRole(role: string): boolean;
  abstract HasClaim$(claim: string): Observable<boolean>;
  abstract HasClaim(claim: string): boolean;
}
