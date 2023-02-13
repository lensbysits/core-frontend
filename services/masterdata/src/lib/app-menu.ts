import { MenuItem } from "@lens/app-abstract";

export const menu: MenuItem[] = [
	{
		translationKey: "menu.title",
		items: [
			{
				translationKey: "menu.items.masterdatas",
				icon: "pi pi-fw pi-briefcase",
				routerLink: ["/"]
			}
		]
	}
];
