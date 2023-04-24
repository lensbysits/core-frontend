import { MenuItem } from "@lens/app-abstract";

export const menu: MenuItem[] = [
	{
		translationKey: "menu.title",
		icon: "pi pi-fw pi-home",
		items: [
			{
				translationKey: "menu.items.masterdata",
				icon: "pi pi-fw pi-briefcase",
				routerLink: ["/"],
				id: "masterdataNavigationItem"
			}
		]
	}
];
