import { UserData } from '../models';
import { Observable } from 'rxjs';

export abstract class UserContextService {
  abstract Changed$: Observable<void>;
  abstract UserData$: Observable<UserData>;
  abstract get UserData(): UserData;
  abstract IsAuthenticated$: Observable<boolean>;
  abstract get IsAuthenticated(): boolean;
  abstract IsInRole$(role: string): Observable<boolean>;
  abstract IsInRole(role: string): boolean;
  abstract HasClaim$(claim: string): Observable<boolean>;
  abstract HasClaim(claim: string): boolean;
}
