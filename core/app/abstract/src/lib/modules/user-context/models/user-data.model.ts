import { Claim } from "./claim.type";

export class UserData {
    Username?: string;
    Roles?: string[];
    Claims?: Claim[];
}