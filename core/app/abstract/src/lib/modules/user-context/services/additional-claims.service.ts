import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Claim } from "../models";

@Injectable()
export abstract class AdditionalClaimsService {
	abstract retrieveAdditionalClaims(): Observable<Claim[]>;
}