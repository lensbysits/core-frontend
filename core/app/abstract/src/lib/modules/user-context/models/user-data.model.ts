import { Claim } from "./claim.type";

export class UserData {
	Username?: string;
	Userid?: string;
	Roles?: string[];
	Claims?: Claim[];
}
