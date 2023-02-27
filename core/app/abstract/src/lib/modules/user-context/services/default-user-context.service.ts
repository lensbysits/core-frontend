import { Inject, Injectable, InjectionToken, OnDestroy, Optional } from "@angular/core";
import { UserContextService } from "./user-context.service";
import { Observable, map, Subject, BehaviorSubject, tap, of } from "rxjs";
import { Claim, UserData } from "../models";
import { AdditionalClaimsService } from "./additional-claims.service";

export const DEFAULT_USER = new InjectionToken<{ UserData: UserData; IsAuthenticated: boolean }>("AppInfo");

@Injectable()
export class DefaultUserContextService extends UserContextService implements OnDestroy {
	protected readonly destroy$ = new Subject<void>();

	private readonly changedSubject: Subject<void> = new Subject();
	private readonly userDataSubject: BehaviorSubject<UserData> = new BehaviorSubject(this.UserData);
	private readonly isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
	
	private _additionalClaimsObservable?: Observable<Claim[]>;
	private get additionalClaimsObservable(): Observable<Claim[]> {
		if (this._additionalClaimsObservable) {
			return this._additionalClaimsObservable;
		}

		if (!this.additionalClaimsService) {
			console.warn("Trying to retrieve additional claims, but no AdditionalClaimService is defined.");
			return of([]);
		}

		this._additionalClaimsObservable = this.additionalClaimsService.retrieveAdditionalClaims();
		return this._additionalClaimsObservable.pipe(
			tap(claims => {
				this.addClaims(claims);
				this.additionalClaimsLoaded = true;
				this.changedSubject.next();
			})
		);
	}

	public changed$ = this.changedSubject.asObservable();
	public userData$ = this.userDataSubject.asObservable();
	public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

	private additionalClaimsLoaded = false;

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

	constructor(
		@Optional() private readonly additionalClaimsService: AdditionalClaimsService,
		@Optional() @Inject(DEFAULT_USER) defaultUser?: { UserData: UserData; IsAuthenticated: boolean }
	) {
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

	public hasClaims$(claims: Claim | Claim[]): Observable<boolean> {
		if (this.additionalClaimsLoaded) {
			return of(this.hasClaims(claims));
		}

		return this.additionalClaimsObservable.pipe(
			map(() => {
				return this.hasClaims(claims);
			})
		);
	}

	public hasClaims(claims: Claim | Claim[]): boolean {
		let temp: Claim[] = [];
		if (claims.constructor !== Array) {
			temp = [ <Claim>claims ];
		} else {
			temp = claims;
		}
		
		return temp.every(claim => this.hasClaim(claim));
	}

	hasClaim = (claim: Claim): boolean => this.hasClaimInternal(this.UserData, claim);

	private hasClaimInternal = (userData: UserData, claim: Claim): boolean => 
		(userData?.Claims?.findIndex((c) => c.name === claim.name && c.value === claim.value) ?? -1) > -1;

	protected Set(userData: UserData, isAuthenticated: boolean): void {
		this.IsAuthenticated = isAuthenticated;
		this.UserData = { ...this.UserData, ...userData };
		this.changedSubject.next();

		if (isAuthenticated) {
			this.additionalClaimsObservable.subscribe();
		}
	}

	public addClaims(claims: Claim[]): void {
		if (!this.UserData.Claims) {
			this.UserData.Claims = [];
		}
		this.UserData.Claims?.push(...claims);
		this.changedSubject.next();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
