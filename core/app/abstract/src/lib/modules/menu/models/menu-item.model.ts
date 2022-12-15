export class MenuItem {
	label = "";
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
	claimfilter?: string[];
	rolefilter?: string[];
	envfilter?: string[];
	anonymousonly?: boolean;
	id?: string;
}

export interface MenuItemCommandEvent {
	originalEvent: Event;
	item: MenuItem;
}
