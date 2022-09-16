export class UserData {
    Username?: string;
    Roles?: string[];
    Claims?: { name: string, value: string }[] | { name: string, value: string[]}[];
}