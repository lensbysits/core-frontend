import { Claim } from "../../user-context";

export class MenuItem {
	label?:string;
	translationKey?: string;
	url?: string;
	routerLink?: string[];
	command?: (event: MenuItemCommandEvent) => void;
	preventExact?: boolean;
	icon?: string;
	target?: string;
	class?: string;
	visible?: boolean;
	disabled?: boolean;
	badge?: string;
	badgeClass?: string;
	extralink?: boolean;
	items?: MenuItem[];
	claimfilter?: Claim[];
	rolefilter?: string[];
	envfilter?: string[];
	anonymousonly?: boolean;
	id?: string;
	order?:number;
}

export interface MenuItemCommandEvent {
	originalEvent: Event;
	item: MenuItem;
}
