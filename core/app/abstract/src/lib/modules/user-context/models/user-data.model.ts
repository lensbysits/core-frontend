import { Claim } from "./claim.type";

export class UserData {
	Username?: string;
	Roles?: string[];
	Claims?: Claim[];
	name?: string | undefined;
	role?: string[] | undefined;
	app?: string;
	personid?: string;
	sub?: string;
	preferred_username?: string;
	email_verified?: string;
}
