import { Claim } from "./claim.type";

export class PermissionClaim implements Claim {
	constructor (
		public value: string
	) {	}

	public name = "Permission";
}