import { Inject, Injectable, InjectionToken, OnDestroy, Optional } from "@angular/core";
import { UserContextService } from "./user-context.service";
import { Observable, map, Subject, BehaviorSubject } from "rxjs";
import { UserData } from "../models";

export const DEFAULT_USER = new InjectionToken<{ UserData: UserData; IsAuthenticated: boolean }>("AppInfo");

@Injectable()
export class DefaultUserContextService extends UserContextService implements OnDestroy {
	protected readonly destroy$ = new Subject<void>();

	private readonly changedSubject: Subject<void> = new Subject();
	private readonly userDataSubject: BehaviorSubject<UserData> = new BehaviorSubject(this.UserData);
	private readonly isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

	public changed$ = this.changedSubject.asObservable();
	public userData$ = this.userDataSubject.asObservable();
	public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

	public get UserData(): UserData {
		return this.userDataSubject?.value;
	}
	private set UserData(userData: UserData) {
		this.userDataSubject.next(userData);
	}

	public get IsAuthenticated(): boolean {
		return this.isAuthenticatedSubject.value;
	}
	private set IsAuthenticated(isAuthenticated: boolean) {
		this.isAuthenticatedSubject.next(isAuthenticated);
	}

	constructor(@Optional() @Inject(DEFAULT_USER) defaultUser?: { UserData: UserData; IsAuthenticated: boolean }) {
		super();
		if (defaultUser) {
			this.Set(defaultUser.UserData, defaultUser.IsAuthenticated);
		}
	}

	IsInRole$(role: string): Observable<boolean> {
		return this.userDataSubject.pipe(map((userData) => this.IsInRoleInternal(userData, role)));
	}

	IsInRole = (role: string): boolean => this.IsInRoleInternal(this.UserData, role);

	private IsInRoleInternal = (userData: UserData, role: string): boolean => this.UserData.Roles?.includes(role) ?? false;

	HasClaim$(claim: string): Observable<boolean> {
		return this.userDataSubject.pipe(map((userData) => this.HasClaimInternal(userData, claim)));
	}

	HasClaim = (claim: string): boolean => this.HasClaimInternal(this.UserData, claim);

	private HasClaimInternal = (userData: UserData, claim: string): boolean => (userData.Claims?.findIndex((c) => c.name === claim) ?? -1) > -1;

	protected Set(userData: UserData, isAuthenticated: boolean): void {
		this.IsAuthenticated = isAuthenticated;
		this.UserData = { ...this.UserData, ...userData };
		this.changedSubject.next();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
