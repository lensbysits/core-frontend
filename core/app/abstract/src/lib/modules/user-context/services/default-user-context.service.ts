import { Inject, Injectable, InjectionToken, OnDestroy, Optional } from '@angular/core';
import { UserContextService } from './user-context.service';
import { Observable, map, Subject, BehaviorSubject } from 'rxjs';
import { UserData } from '../models';

export const DEFAULT_USER = new InjectionToken<{UserData: UserData, IsAuthenticated: boolean}>('AppInfo');

@Injectable()
export class DefaultUserContextService extends UserContextService implements OnDestroy {
  protected readonly destroy$ = new Subject<void>();

  readonly Changed$: Subject<void> = new Subject();
  readonly UserData$: BehaviorSubject<UserData> = new BehaviorSubject(this.UserData);
  readonly IsAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public get UserData(): UserData {
    return this.UserData$?.value;
  }
  private set UserData(userData: UserData) {
    this.UserData$.next(userData);
  }

  public get IsAuthenticated(): boolean {
    return this.IsAuthenticated$.value;
  }
  private set IsAuthenticated(isAuthenticated: boolean) {
    this.IsAuthenticated$.next(isAuthenticated);
  }

  constructor(@Optional() @Inject(DEFAULT_USER) defaultUser?: {UserData: UserData, IsAuthenticated: boolean}) {
    super();
    if(defaultUser) {
      this.Set(defaultUser.UserData, defaultUser.IsAuthenticated);
    }
  }

  IsInRole$(role: string): Observable<boolean> {    
    return this.UserData$.pipe(map(userData => userData?.Roles?.includes(role) ?? false));
  };

  IsInRole = (role: string) => this.UserData.Roles?.includes(role) ?? false;
  
  HasClaim$(claim: string): Observable<boolean> {
    return this.UserData$.pipe(map(userData => (userData?.Claims?.findIndex(c => c.name === claim) ?? -1) > -1));
  };
  
  HasClaim = (claim: string) => (this.UserData.Claims?.findIndex(c => c.name === claim) ?? -1) > -1

  protected Set(userData: UserData, isAuthenticated: boolean): void {
    this.IsAuthenticated = isAuthenticated;
    this.UserData = { ...this.UserData, ...userData };
    this.Changed$.next();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
}
}
