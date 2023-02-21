import { MenuItem } from "@lens/app-abstract";

export const menu: MenuItem[] = [
	{
		translationKey: "menu.title",
		items: [
			{
				translationKey: "menu.items.masterdata",
				icon: "pi pi-fw pi-briefcase",
				routerLink: ["/"]
			}
		]
	}
];
